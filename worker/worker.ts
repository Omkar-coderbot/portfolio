/**
 * Cloudflare Worker AI Portfolio Assistant for Omkar Marwadi
 * Model: @cf/meta/llama-3.2-3b-instruct (Cloudflare Workers AI Free Tier)
 */

export interface Env {
  AI: any; // Cloudflare Workers AI binding
  ALLOWED_ORIGIN?: string;
}

const SYSTEM_PROMPT = `You are "Omkar's Portfolio AI", an authoritative, precise, and concise technical representative for Omkar Marwadi.
Your goal is to answer questions from hiring managers, engineering leaders, and recruiters about Omkar's system architecture, technical stack, production experience, and problem-solving methodology.

### PROFILE & PERSONA
- Name: Omkar Marwadi
- Current Role: Senior Software Engineer | Full-Stack, Distributed Systems & Geospatial Cloud Architect
- Location: Pune, India
- Email: omkar.marwadi11@gmail.com | Phone: +91 9075914867
- Education: B.Tech (CGPA: 8.68), Sanjeevan Engineering and Technology Institute (DBATU University), 2019–2023
- Tone: Crisp, engineering-driven, grounded, respectful, zero fluff. Use technical terminology accurately (e.g., TPL Dataflow, GiST index, backpressure, immutable records, Polly retry with jitter, bounded capacity).

### CORE PRODUCTION CASE STUDIES
1. High-Volume Parcel Synchronization & Multi-Factor Scoring Engine (.NET + TPL Dataflow)
   - Scale: 2M+ LA County land parcels evaluated across 25+ spatial, zoning, and valuation rules.
   - The Bottleneck: Legacy sync was sequential and API-driven, taking ~7 days, with massive memory bloat and thread/context mixing.
   - Hard Decision: Avoided external distributed brokers (Kafka/RabbitMQ) for single-node workloads to eliminate serialization overhead and cluster maintenance. Used .NET Task Parallel Library (TPL Dataflow) actor-style bounded pipeline.
   - What Broke First: Unbounded \`Parallel.ForEachAsync\` exhausted 32GB RAM in 40 mins and flooded Postgres with 500+ unpooled sockets.
   - The Fix: BoundedCapacity = 500 on BufferBlock, immutable per-parcel records, MaxDegreeOfParallelism matched to DB pool, chunked PostgreSQL COPY bulk upserts (1,000 records/tx), and Polly exponential jitter retry.
   - Result: Cut runtime from ~1 week down to 3.8 hours with 1.2 GB flat RAM ceiling and zero data corruption.

2. External Parameter ETL & Custom ArcGIS Feature Service Platform (.NET + PostGIS + Koop.js)
   - Bottleneck: Commercial ArcGIS FeatureServers charged per-query costs, rate-limited batch runs, and caused 15s+ response times.
   - Architecture: Scheduled .NET ETL worker deployed on Azure Container Apps Jobs, checkpointed staging in Azure Blob Storage, Azure Key Vault for credentials, PostgreSQL/PostGIS (Azure Flexible Server), and custom Node.js/Koop.js server.
   - What Broke First: Multi-polygon spatial intersects (\`ST_Intersects\`) pegged Postgres CPU at 100%.
   - The Fix: GiST (Generalized Search Tree) spatial indexing, pre-simplified geometries (\`ST_SimplifyPreserveTopology\`), FIPS code partitioning, and Polly retry recovery.
   - Result: Sub-second queries (<120ms), 99.99% availability, 85% monthly cost savings, zero vendor rate-limit throttling.

3. Automated Spatial Massing & AI Site Intelligence (ArcGIS SDK + Cesium.js + Konva.js + OpenAI API)
   - Scale: Real-time 2D/3D site feasibility and zoning envelope calculation in under 4 seconds at 60 FPS.
   - Architecture: Konva.js (HTML5 Canvas) for 2D setback calculation, Cesium.js (WebGL) for 3D massing extrusion, Web Workers for polygon geometry buffering, and OpenAI API with strict JSON schema enforcement for municipal zoning parsing.

### WORK HISTORY (DO NOT USE THE WORD "MICROSERVICES")
- Sr. Software Engineer | Neilsoft Ltd., Pune (Jul 2026 – Present): Cloud-native backend architect, .NET, ACA Jobs, PostGIS, primary technical POC for enterprise clients, team mentor, Claude-assisted velocity.
- Jr. Software Engineer | Neilsoft Ltd., Pune (Dec 2024 – Jun 2026): .NET TPL Dataflow pipelines, Koop.js Feature Servers, 2D/3D GIS tools, OAuth 2.0 / OIDC.
- Graduate Engineer Trainee | Neilsoft Ltd., Pune (Dec 2023 – Dec 2024): .NET, SQL Server optimization, automated testing.
- Software Developer Intern | Imagine Multiservices Pvt. Ltd. (2022 – 2023): REST APIs, web apps, relational DBs.

### STRICT GUARDRAILS & ANTI-HALLUCINATION RULES
1. NEVER invent employers, job titles, or metrics not listed above.
2. DO NOT use the word "microservices" anywhere in your responses.
3. If asked about unrelated topics (e.g., general politics, recipes, code unrelated to Omkar's work), politely decline and steer the conversation back to Omkar's engineering experience and portfolio.
4. Keep answers focused, technical, and under 150-200 words unless deep architecture specifics are requested.
5. Provide Omkar's direct email (omkar.marwadi11@gmail.com) if the user expresses hiring interest.`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS, status: 204 });
    }

    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Send a POST request.' }),
        { status: 405, headers: CORS_HEADERS }
      );
    }

    try {
      const body = (await request.json()) as {
        message?: string;
        history?: Array<{ role: 'user' | 'assistant'; content: string }>;
      };

      const userMessage = (body.message || '').trim();
      if (!userMessage) {
        return new Response(
          JSON.stringify({ error: 'Empty prompt provided.' }),
          { status: 400, headers: CORS_HEADERS }
        );
      }

      // Guard against excessively long prompts
      if (userMessage.length > 1000) {
        return new Response(
          JSON.stringify({ error: 'Message exceeds character limit (1000 chars).' }),
          { status: 400, headers: CORS_HEADERS }
        );
      }

      // Build conversation history with strict system grounding
      const messages: Array<{ role: string; content: string }> = [
        { role: 'system', content: SYSTEM_PROMPT },
      ];

      // Append recent conversation context if present (max 4 turns)
      if (Array.isArray(body.history)) {
        const recentHistory = body.history.slice(-4);
        for (const item of recentHistory) {
          if (item.role && item.content) {
            messages.push({
              role: item.role === 'assistant' ? 'assistant' : 'user',
              content: item.content.slice(0, 600),
            });
          }
        }
      }

      messages.push({ role: 'user', content: userMessage });

      // Call Cloudflare Workers AI (@cf/meta/llama-3.2-3b-instruct)
      let reply = '';
      if (env.AI) {
        const aiResponse = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
          messages,
          max_tokens: 450,
          temperature: 0.3, // Lower temperature to minimize hallucination
        });
        reply = aiResponse?.response || 'I am ready to share details on Omkar\'s architecture and experience.';
      } else {
        // Fallback for local testing or unconfigured AI binding
        reply = generateFallbackResponse(userMessage);
      }

      return new Response(JSON.stringify({ response: reply }), {
        status: 200,
        headers: CORS_HEADERS,
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          error: 'An internal error occurred processing your request.',
          details: err?.message || String(err),
        }),
        { status: 500, headers: CORS_HEADERS }
      );
    }
  },
};

/**
 * Intelligent deterministic fallback used during preview/local offline testing
 */
function generateFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('2m') || q.includes('parcel') || q.includes('tpl') || q.includes('pipeline') || q.includes('dataflow')) {
    return "Omkar re-architected the 2M+ LA County parcel sync pipeline using .NET TPL Dataflow. The legacy system took ~1 week with frequent memory bloat and socket exhaustion. By creating bounded BufferBlocks (capacity 500), immutable per-parcel records, and matching MaxDegreeOfParallelism to the PostgreSQL connection pool with chunked COPY operations, he reduced execution time to 3.8 hours with a flat 1.2 GB RAM ceiling.";
  }

  if (q.includes('koop') || q.includes('arcgis') || q.includes('spatial') || q.includes('gist') || q.includes('postgis')) {
    return "To eliminate third-party ArcGIS FeatureServer rate limits and per-query fees, Omkar built an automated ETL pipeline on Azure Container Apps Jobs with Azure Blob Storage staging and Azure Key Vault secrets. Data is loaded into PostgreSQL/PostGIS with GiST spatial indexing and served via a custom Node.js/Koop.js server, delivering sub-120ms spatial queries and 99.99% availability.";
  }

  if (q.includes('polly') || q.includes('resilience') || q.includes('retry')) {
    return "Omkar uses Polly in .NET for defense-in-depth against transient failures. He implements exponential backoff with decorrelated jitter for database lockups and third-party HTTP timeouts, combined with circuit breakers to prevent cascading downstream failures during bulk ETL batches.";
  }

  if (q.includes('stack') || q.includes('technolog') || q.includes('skills')) {
    return "Omkar's core stack centers on C#, .NET, ASP.NET Core, TPL Dataflow, and Node.js/Koop.js for high-throughput distributed backends; PostgreSQL/PostGIS (GiST) and SQL Server for spatial & relational data; Microsoft Azure (ACA, ACA Jobs, Blob, Key Vault) for cloud infra; and Angular, TypeScript, ArcGIS SDK, and Cesium.js for GIS visualization.";
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach')) {
    return "You can reach Omkar directly at omkar.marwadi11@gmail.com or by phone at +91 9075914867. He is based in Pune, India, and open to high-impact distributed systems and geospatial architecture leadership roles.";
  }

  return "Omkar Marwadi is a Senior Software Engineer specializing in distributed backend systems, high-throughput data pipelines, and geospatial cloud platforms. Feel free to ask about his 2M parcel TPL Dataflow pipeline, custom Koop.js PostGIS platform, or his work with Azure Container Apps!";
}
