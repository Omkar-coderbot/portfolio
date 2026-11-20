import { Injectable, signal } from '@angular/core';
import { ChatMessage } from '../models/portfolio.model';
import { AI_SUGGESTED_PROMPTS, PROFILE_DATA } from '../data/portfolio-data';

export interface ChatApiResponse {
  response?: string;
  error?: string;
  rateLimited?: boolean;
  serviceUnavailable?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AiAssistantService {
  // Cloudflare Pages Function endpoint
  private readonly apiUrl = '/api/chat';

  // Angular Signals for state management
  readonly isOpen = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly isRateLimited = signal<boolean>(false);
  readonly isServiceUnavailable = signal<boolean>(false);
  readonly suggestedPrompts = signal<string[]>(AI_SUGGESTED_PROMPTS);

  readonly messages = signal<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I am Omkar's Portfolio AI Assistant. Ask me about Omkar's 2M+ parcel TPL Dataflow pipeline, PostGIS GiST spatial indexing, the 2D/3D Spatial Massing tool, or his engineering experience at Neilsoft Ltd.",
      timestamp: new Date(),
    },
  ]);

  toggleOpen(): void {
    this.isOpen.update((v) => !v);
  }

  setOpen(open: boolean): void {
    this.isOpen.set(open);
  }

  clearError(): void {
    this.errorMessage.set(null);
    this.isRateLimited.set(false);
    this.isServiceUnavailable.set(false);
  }

  async sendQuestion(content: string): Promise<void> {
    const trimmed = content.trim();
    if (!trimmed || this.isLoading()) return;

    // Client-side guard for 300 character limit
    if (trimmed.length > 300) {
      this.errorMessage.set(`Message exceeds the 300-character limit (${trimmed.length}/300 chars).`);
      return;
    }

    this.clearError();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    // Append user message immediately
    this.messages.update((msgs) => [...msgs, userMessage]);
    this.isLoading.set(true);

    try {
      // Stateless request: only send the single user question to minimize tokens
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data: ChatApiResponse = await res.json().catch(() => ({}));

      if (res.status === 429) {
        // Rate limited (5 requests per minute)
        this.isRateLimited.set(true);
        const rateLimitNotice =
          data.error ||
          'Rate limit reached (5 questions/min). Please wait 60 seconds or reach out to Omkar directly at omkar.marwadi11@gmail.com.';
        this.errorMessage.set(rateLimitNotice);

        this.messages.update((msgs) => [
          ...msgs,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: rateLimitNotice,
            timestamp: new Date(),
            status: 'error',
          },
        ]);
        return;
      }

      if (res.status === 503) {
        // Daily free 10k Neuron quota reached or Workers AI unavailable
        this.isServiceUnavailable.set(true);
        const quotaNotice =
          data.error ||
          'The AI assistant quota has been reached for today. Please contact Omkar Marwadi directly at omkar.marwadi11@gmail.com or on LinkedIn.';
        this.errorMessage.set(quotaNotice);

        this.messages.update((msgs) => [
          ...msgs,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: quotaNotice,
            timestamp: new Date(),
            status: 'error',
          },
        ]);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const replyText =
        data.response ||
        'I am ready to answer any questions about Omkar\'s technical stack and case studies.';

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date(),
        status: 'complete',
      };

      this.messages.update((msgs) => [...msgs, assistantMessage]);
    } catch (err: any) {
      console.warn('API chat fetch failed, providing verified local response:', err);
      const fallbackReply = this.getLocalFallback(trimmed);
      this.messages.update((msgs) => [
        ...msgs,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: fallbackReply,
          timestamp: new Date(),
          status: 'complete',
        },
      ]);
    } finally {
      this.isLoading.set(false);
    }
  }

  private getLocalFallback(query: string): string {
    const q = query.toLowerCase();
    if (
      q.includes('2m') ||
      q.includes('parcel') ||
      q.includes('tpl') ||
      q.includes('dataflow') ||
      q.includes('13x')
    ) {
      return 'For the Geospatial Real Estate & Parcel Platform, Omkar architected an in-process bounded pipeline using .NET TPL Dataflow. It evaluated 2M+ LA County parcels with automated financial reporting and OpenAI-assisted summaries. By pairing bounded BufferBlocks, concurrent TransformBlocks, and chunked PostgreSQL COPY ActionBlocks, the team achieved 13x faster ingestion and reduced parcel selection latency from hours to under 2 minutes.';
    }
    if (
      q.includes('massing') ||
      q.includes('layout') ||
      q.includes('cesium') ||
      q.includes('konva') ||
      q.includes('floor-plan') ||
      q.includes('floor plan')
    ) {
      return 'The Spatial Massing & Floor-Plan Layout Tool is a browser-based 2D and 3D application that reduced initial layout preparation from ~2 months to ~15 minutes. It combines Konva.js for interactive 2D setback sketching on HTML5 canvas and Cesium.js for volumetric 3D massing extrusions at 60 FPS, with parcel boundaries streamed via the ArcGIS JS API.';
    }
    if (
      q.includes('etl') ||
      q.includes('koop') ||
      q.includes('postgis') ||
      q.includes('gist') ||
      q.includes('polly') ||
      q.includes('serverless')
    ) {
      return 'Omkar designed a serverless GIS ETL pipeline on Azure using Azure Container Apps Jobs with .NET and Polly retries. It ingests external ArcGIS APIs into PostgreSQL/PostGIS with GiST spatial indexing, served via a custom Node.js and Koop.js FeatureServer that delivers sub-second (<120ms) spatial lookups with 99.99% availability.';
    }
    if (
      q.includes('how i work') ||
      q.includes('mentoring') ||
      q.includes('poc') ||
      q.includes('performance')
    ) {
      return 'Omkar operates across three core pillars: (1) Client Technical Point of Contact (direct requirement discussions, pragmatic trade-offs, steady delivery), (2) Mentoring (thorough code reviews, concurrency debugging, backend structure, and SQL optimization), and (3) Practical Performance (GiST spatial indexing, bounded parallel pipelines, and Polly resilience).';
    }
    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('phone') ||
      q.includes('hire') ||
      q.includes('resume')
    ) {
      return `You can contact Omkar Marwadi directly at ${PROFILE_DATA.email} or by phone at ${PROFILE_DATA.phone}. He is based in Pune, India. You can also download his resume directly via the 'Download Resume' action on this page.`;
    }
    return 'Omkar Marwadi is a Senior Software Engineer at Neilsoft Ltd. (Pune, India) with 3+ years of full-stack and geospatial software engineering experience across C#, .NET, ASP.NET Core, Angular, PostGIS, Azure Container Apps, and browser 2D/3D geometry tools. Feel free to ask about any of his production case studies or architecture patterns!';
  }
}
