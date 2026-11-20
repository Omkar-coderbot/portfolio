/**
 * Cloudflare Pages Function: /api/chat
 * Free, rate-limited AI Q&A endpoint powered by Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct)
 *
 * Setup in Cloudflare Pages:
 * 1. Go to Cloudflare Dashboard -> Workers & Pages -> Select your project -> Settings -> Functions
 * 2. Under "Workers AI bindings", add a binding:
 *    - Variable name: AI
 * 3. Deploy or redeploy your Pages project.
 */

interface Env {
  AI?: {
    run: (
      model: string,
      inputs: {
        messages: Array<{ role: string; content: string }>;
        max_tokens?: number;
        temperature?: number;
      }
    ) => Promise<{ response?: string }>;
  };
}

const SYSTEM_PROMPT = `You are the official Portfolio AI Assistant for Omkar Marwadi.
Your role is to answer questions from engineering leaders, hiring managers, and recruiters accurately, factually, and concisely about Omkar's production engineering experience, architecture, and technology stack.

### CANDIDATE PROFILE (GROUND TRUTH)
- Name: Omkar Marwadi
- Current Role: Senior Software Engineer at Neilsoft Ltd. (Pune, India) — Jul 2026 to Present
- Total Experience: 3+ years of full-stack and geospatial software engineering experience
- Past Tenure at Neilsoft Ltd.:
  - Junior Software Engineer (Dec 2024 – Jun 2026)
  - Graduate Engineer Trainee (Dec 2023 – Dec 2024)
- Education: Bachelor of Technology (B.Tech) in Computer Science & Engineering (CGPA: 8.68/10.0), Sanjeevan Engineering and Technology Institute / DBATU (2019–2023)
- Contacts: Email: omkar.marwadi11@gmail.com | LinkedIn: https://linkedin.com/in/omkarmarwadi

### CORE TECHNOLOGIES
- Languages & Backends: C#, .NET, ASP.NET Core Web API, Node.js, TypeScript
- Data Pipelines & Resilience: .NET TPL Dataflow (in-process bounded pipelines with backpressure), Polly (retry with decorrelated exponential jitter, circuit breakers)
- Geospatial & Databases: PostgreSQL, PostGIS (GiST spatial indexing, ST_Intersects, ST_Contains), Koop.js (custom GeoServices REST server)
- Cloud & Infrastructure: Azure Container Apps (ACA), Azure Container Apps Jobs (scheduled cron-triggered batch workers), Azure Blob Storage, Azure Key Vault, Docker, Git
- Frontend & 3D/2D GIS: Angular (standalone components, Signals, @for/@if control flow), ArcGIS SDK & JS API, Cesium.js (3D WebGL building massing), Konva.js (2D HTML5 canvas drafting), CSS
- Applied AI Tools: Claude, OpenAI API (structured municipal zoning bylaw parsing)

### THREE PRODUCTION CASE STUDIES
1. Geospatial Real Estate & Parcel Platform (.NET Web API, TPL Dataflow, PostgreSQL, PostGIS, Angular, OpenAI API, SSO):
   - Evaluated 2M+ Los Angeles County land parcels with 25+ zoning and valuation factors.
   - Built a multi-threaded in-process TPL Dataflow sync engine with bounded capacity (500) and chunked COPY commits (1,000 records).
   - Achieved 13x faster ingestion speed, cutting parcel selection latency from hours to under 2 minutes with a flat 1.2 GB RAM ceiling.
   - Integrated Google/Microsoft SSO with RBAC and OpenAI API for automated municipal parcel summaries.

2. Spatial Massing & Floor-Plan Layout Tool (Angular, ArcGIS JS API, Cesium.js, Konva.js, TypeScript):
   - Browser-based 2D and 3D layout tool generating building massing envelopes and floor plans from parcel boundaries and municipal zoning rules.
   - Reduced initial building layout preparation time from ~2 months to roughly 15 minutes.
   - Uses Konva.js for interactive 2D setback buffering and Cesium.js for volumetric 3D massing extrusion at 60 FPS WebGL, offloading geometric sweep-line computations to Web Workers.

3. Serverless GIS ETL & Spatial Feature Service (Azure Container Apps Jobs, .NET, Polly, PostGIS, Node.js, Koop.js, Azure Blob & Key Vault):
   - Serverless pipeline on Azure ingesting external commercial ArcGIS REST APIs into PostGIS.
   - Managed via scheduled Azure Container Apps Jobs with Polly retry policies (exponential jitter) to handle transient rate limits.
   - Served through an in-house Node.js and Koop.js GeoServices provider with PostGIS GiST spatial indexing, delivering sub-second (<120ms) spatial query lookups with 99.99% availability and 85% monthly cost savings.

### HOW OMKAR WORKS
- Client Technical Point of Contact: Direct involvement in client requirement discussions, clarifying scope and trade-offs, and supporting steady delivery.
- Mentoring: Guiding junior engineers through code reviews, debugging support, backend structure, and database/query optimization.
- Practical Performance: Focusing on reliable execution, spatial indexing, parallel/batch processing, and clean, maintainable code.

### STRICT RULES & GUARDRAILS
1. Tone: Crisp, engineering-focused, grounded, professional.
2. NEVER describe any architecture as "microservices" (strictly forbidden).
3. NEVER invent or hallucinate employers, metrics, or technologies not listed above.
4. Keep all responses concise (under 150 words).
5. For any inquiries outside Omkar's portfolio scope, or if the user asks about hiring or interviews, politely direct them to Omkar's email (omkar.marwadi11@gmail.com) or LinkedIn (https://linkedin.com/in/omkarmarwadi).`;

// Allowed origins validator
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
  const host = (request.headers.get('Host') || '').toLowerCase();

  // If both Origin and Referer are absent (e.g. same-origin direct fetch in some browsers)
  if (!origin && !referer) {
    if (host.includes('localhost') || host.includes('127.0.0.1') || host.endsWith('.pages.dev')) {
      return true;
    }
    return true;
  }

  const check = (urlStr: string): boolean => {
    try {
      const u = new URL(urlStr);
      const h = u.hostname.toLowerCase();
      if (h === 'localhost' || h === '127.0.0.1') return true;
      if (h.endsWith('.pages.dev')) return true;
      if (host && h === host.split(':')[0]) return true;
      return false;
    } catch {
      return false;
    }
  };

  if (origin && check(origin)) return true;
  if (referer && check(referer)) return true;
  return false;
}

// In-memory per-IP rate limiting using Cloudflare caches.default API
// 5 requests per 60 seconds per CF-Connecting-IP
async function enforceRateLimit(
  request: Request
): Promise<{ allowed: boolean; currentHits: number }> {
  const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';

  try {
    const cache = (caches as any).default;
    if (!cache) {
      return { allowed: true, currentHits: 1 };
    }

    const rateLimitUrl = new URL(
      `https://ratelimit.internal/ip/${encodeURIComponent(clientIp)}`
    );
    const cacheKey = new Request(rateLimitUrl.toString());

    let hits = 0;
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      try {
        const data = await cachedResponse.json();
        hits = Number(data?.count) || 0;
      } catch {}
    }

    if (hits >= 5) {
      return { allowed: false, currentHits: hits };
    }

    const newHits = hits + 1;
    const newCacheResponse = new Response(JSON.stringify({ count: newHits }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    });

    await cache.put(cacheKey, newCacheResponse);
    return { allowed: true, currentHits: newHits };
  } catch {
    // If cache API is not supported in the current environment (e.g. local preview), allow gracefully
    return { allowed: true, currentHits: 1 };
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Handle CORS OPTIONS preflight
export const onRequestOptions = async () => {
  return new Response(null, { headers: CORS_HEADERS, status: 204 });
};

// Handle POST /api/chat
export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  // 1. Validate Origin / Referer
  if (!isAllowedOrigin(request)) {
    return new Response(
      JSON.stringify({ error: 'Forbidden: Request origin is not permitted.' }),
      { status: 403, headers: CORS_HEADERS }
    );
  }

  // 2. Parse & Validate Input Safeguards (Stateless, Max 300 Characters)
  let body: { message?: string } | null = null;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Bad Request: Invalid JSON body.' }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (!body || typeof body.message !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Bad Request: JSON object with { message: string } is required.' }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const userMessage = body.message.trim();

  // Reject empty message
  if (userMessage.length === 0) {
    return new Response(
      JSON.stringify({ error: 'Bad Request: Message cannot be empty.' }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // Reject message exceeding 300 characters
  if (userMessage.length > 300) {
    return new Response(
      JSON.stringify({
        error: `Bad Request: Message exceeds the 300-character limit (${userMessage.length}/300 chars).`,
      }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // 3. Per-IP Rate Limiting (5 requests per 60 seconds)
  const rateLimit = await enforceRateLimit(request);
  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({
        error:
          'Rate limit reached: Maximum 5 questions per minute. Please wait 60 seconds, or contact Omkar Marwadi directly via email (omkar.marwadi11@gmail.com) or LinkedIn.',
        rateLimited: true,
      }),
      {
        status: 429,
        headers: {
          ...CORS_HEADERS,
          'Retry-After': '60',
        },
      }
    );
  }

  // 4. Call Cloudflare Workers AI with @cf/meta/llama-3.1-8b-instruct
  // Stateless request: only system prompt + single user question
  if (env && env.AI) {
    try {
      const aiResult = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 250,
        temperature: 0.3,
      });

      const reply =
        aiResult?.response?.trim() ||
        "I am ready to share details on Omkar's experience, .NET pipelines, or geospatial architecture.";

      return new Response(JSON.stringify({ response: reply }), {
        status: 200,
        headers: CORS_HEADERS,
      });
    } catch (err: any) {
      // 503 response if free 10,000 daily Neuron quota is reached or service fails
      console.error('Workers AI invocation error:', err);
      return new Response(
        JSON.stringify({
          error:
            'The AI assistant quota has been reached for today or the service is temporarily unavailable. Please contact Omkar Marwadi directly via email at omkar.marwadi11@gmail.com or on LinkedIn at https://linkedin.com/in/omkarmarwadi.',
          serviceUnavailable: true,
        }),
        {
          status: 503,
          headers: CORS_HEADERS,
        }
      );
    }
  }

  // 5. Deterministic fallback when env.AI is not bound (e.g. local preview)
  const fallbackReply = getLocalFallbackAnswer(userMessage);
  return new Response(
    JSON.stringify({
      response: fallbackReply,
      localDevNote: 'env.AI binding not detected; returning verified local response.',
    }),
    {
      status: 200,
      headers: CORS_HEADERS,
    }
  );
};

// Grounded fallback answer when running without Cloudflare Workers AI binding
function getLocalFallbackAnswer(query: string): string {
  const q = query.toLowerCase();

  if (
    q.includes('2m') ||
    q.includes('parcel') ||
    q.includes('tpl') ||
    q.includes('dataflow') ||
    q.includes('speed') ||
    q.includes('13x')
  ) {
    return 'For the Geospatial Real Estate Platform, Omkar architected a multi-threaded bounded pipeline using .NET TPL Dataflow evaluating 2M+ LA County parcels. By pairing bounded BufferBlocks (capacity 500), concurrent TransformBlocks, and chunked bulk COPY ActionBlocks, the pipeline ran 13x faster and reduced parcel selection latency from hours to under 2 minutes with a flat 1.2 GB RAM ceiling.';
  }

  if (
    q.includes('massing') ||
    q.includes('floor') ||
    q.includes('layout') ||
    q.includes('cesium') ||
    q.includes('konva') ||
    q.includes('3d') ||
    q.includes('2d')
  ) {
    return 'The Spatial Massing & Floor-Plan Layout Tool is a browser-based 2D and 3D application that collapsed building layout preparation from roughly 2 months to ~15 minutes. It combines Konva.js for interactive 2D setback buffering and Cesium.js for volumetric 3D massing extrusions at 60 FPS WebGL, using Angular Signals and Web Workers for polygon geometry buffering.';
  }

  if (
    q.includes('etl') ||
    q.includes('koop') ||
    q.includes('postgis') ||
    q.includes('gist') ||
    q.includes('polly') ||
    q.includes('serverless') ||
    q.includes('azure')
  ) {
    return 'Omkar built a serverless GIS ETL pipeline on Azure using Azure Container Apps Jobs with .NET and Polly retries. It ingests external ArcGIS APIs into PostgreSQL/PostGIS with GiST spatial indexing, served via a custom Node.js and Koop.js FeatureServer that delivers sub-second (<120ms) spatial query lookups with 99.99% availability and 85% cost savings.';
  }

  if (
    q.includes('role') ||
    q.includes('title') ||
    q.includes('experience') ||
    q.includes('tenure') ||
    q.includes('company') ||
    q.includes('neilsoft')
  ) {
    return 'Omkar Marwadi is a Senior Software Engineer at Neilsoft Ltd. in Pune, India (Jul 2026 – Present), with 3+ years of progressive engineering experience, having previously served as Junior Software Engineer and Graduate Engineer Trainee at Neilsoft.';
  }

  if (
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('linkedin') ||
    q.includes('phone')
  ) {
    return 'You can reach Omkar Marwadi directly via email at omkar.marwadi11@gmail.com, by phone at +91 9075914867, or on LinkedIn at https://linkedin.com/in/omkarmarwadi. He is based in Pune, India.';
  }

  return 'Omkar Marwadi is a Senior Software Engineer at Neilsoft Ltd. specializing in high-throughput backend data pipelines (.NET, TPL Dataflow), PostGIS GiST spatial indexing, and browser-based 2D/3D geometry tools. Direct hiring inquiries to omkar.marwadi11@gmail.com or linkedin.com/in/omkarmarwadi.';
}
