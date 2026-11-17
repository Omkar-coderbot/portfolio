import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../models/portfolio.model';
import { AI_SUGGESTED_PROMPTS } from '../data/portfolio-data';

@Injectable({
  providedIn: 'root',
})
export class AiAssistantService {
  private http = inject(HttpClient);

  // Cloudflare Worker / Pages function endpoint (relative path works with Pages Functions)
  private readonly apiUrl = '/api/chat';

  readonly isOpen = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);
  readonly suggestedPrompts = signal<string[]>(AI_SUGGESTED_PROMPTS);

  readonly messages = signal<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I am Omkar's Portfolio AI Assistant, running directly on Cloudflare Workers AI with Llama 3.2. Ask me anything about Omkar's 2M+ parcel TPL Dataflow pipeline, PostGIS GiST query tuning, custom Koop.js architecture, or his backend engineering experience.",
      timestamp: new Date(),
    },
  ]);

  toggleOpen(): void {
    this.isOpen.update((v) => !v);
  }

  setOpen(open: boolean): void {
    this.isOpen.set(open);
  }

  async sendMessage(content: string): Promise<void> {
    const trimmed = content.trim();
    if (!trimmed || this.isLoading()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    // Append user message immediately
    this.messages.update((msgs) => [...msgs, userMessage]);
    this.isLoading.set(true);

    // Build context history for the model
    const history = this.messages()
      .filter((m) => m.role !== 'system')
      .slice(-4)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!response.ok) {
        throw new Error(`Worker returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.response || 'No response returned from the AI model.';

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date(),
      };

      this.messages.update((msgs) => [...msgs, assistantMessage]);
    } catch (err) {
      console.warn('API chat endpoint unavailable, falling back to local deterministic response:', err);
      // Seamless graceful fallback
      const fallbackReply = this.getLocalFallback(trimmed);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date(),
      };
      this.messages.update((msgs) => [...msgs, assistantMessage]);
    } finally {
      this.isLoading.set(false);
    }
  }

  private getLocalFallback(query: string): string {
    const q = query.toLowerCase();
    if (q.includes('2m') || q.includes('parcel') || q.includes('tpl') || q.includes('dataflow')) {
      return "Omkar re-architected the 2M+ LA County parcel sync pipeline using .NET 8 TPL Dataflow. The legacy system took ~1 week with frequent memory bloat. By creating bounded BufferBlocks (capacity 500), immutable per-parcel records, and matching MaxDegreeOfParallelism to the PostgreSQL connection pool with chunked COPY operations, he reduced execution time to 3.8 hours with a flat 1.2 GB RAM ceiling.";
    }
    if (q.includes('koop') || q.includes('arcgis') || q.includes('spatial') || q.includes('gist') || q.includes('postgis')) {
      return "To eliminate third-party ArcGIS FeatureServer rate limits and per-query fees, Omkar built an automated ETL pipeline on Azure Container Apps Jobs with Azure Blob Storage staging and Azure Key Vault secrets. Data is loaded into PostgreSQL/PostGIS with GiST spatial indexing and served via a custom Node.js/Koop.js server, delivering sub-120ms spatial queries and 99.99% availability.";
    }
    if (q.includes('polly') || q.includes('resilience') || q.includes('retry')) {
      return "Omkar uses Polly in .NET 8 for defense-in-depth against transient failures. He implements exponential backoff with decorrelated jitter for database lockups and third-party HTTP timeouts, combined with circuit breakers to prevent cascading downstream failures.";
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
      return "You can reach Omkar directly at omkar.marwadi11@gmail.com or by phone at +91 9075914867. He is based in Pune, India.";
    }
    return "Omkar Marwadi is a Senior Software Engineer specializing in distributed systems, high-throughput backend data pipelines, and geospatial cloud platforms (.NET 8, PostGIS, Azure ACA, Koop.js, Angular). Feel free to ask about any of his production case studies!";
  }
}
