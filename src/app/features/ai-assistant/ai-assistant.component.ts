import { Component, inject, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiAssistantService } from '../../core/services/ai-assistant.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Launcher Button (Bottom Right) -->
    <aside aria-label="AI Portfolio Assistant">
    <div class="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        (click)="aiService.toggleOpen()"
        [attr.aria-label]="aiService.isOpen() ? 'Close AI Portfolio Assistant' : 'Open AI Portfolio Assistant'"
        class="group flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-sky-500/60 shadow-2xl transition-all cursor-pointer">
        <span class="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
          Ask Omkar's AI
        </span>
        <div class="w-8 h-8 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
      </button>
    </div>

    <!-- AI Chat Slide-over / Modal -->
    @if (aiService.isOpen()) {
      <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 pointer-events-none">
        <!-- Backdrop on mobile -->
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-xs sm:hidden pointer-events-auto"
          (click)="aiService.setOpen(false)"></div>

        <!-- Chat Container (Spatial Telemetry & Dark Cartography styling) -->
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-chat-title"
          class="pointer-events-auto w-full sm:max-w-lg h-[90vh] sm:h-[640px] flex flex-col rounded-t-2xl sm:rounded-2xl border border-[#1E293B] bg-[#111827] shadow-2xl overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          <!-- Header -->
          <div class="p-4 border-b border-[#1E293B] bg-[#0B0F19] flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                AI
              </div>
              <div>
                <h3 id="ai-chat-title" class="text-sm font-bold text-[#F8FAFC] flex items-center gap-2">
                  Omkar's Architecture AI
                  <span class="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                    Llama 3.2
                  </span>
                </h3>
                <p class="text-[11px] font-mono text-[#94A3B8]">
                  Cloudflare Workers AI • Zero Hallucination Grounding
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="aiService.setOpen(false)"
              aria-label="Close assistant"
              class="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Suggested Prompt Chips (Scrollable) -->
          <div class="px-4 py-2.5 bg-[#0B0F19]/60 border-b border-[#1E293B] flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap scrollbar-none">
            <span class="text-[10px] font-mono text-sky-400 uppercase tracking-wider shrink-0 mr-1">Suggested:</span>
            @for (prompt of aiService.suggestedPrompts(); track prompt) {
              <button
                type="button"
                (click)="sendPreset(prompt)"
                [disabled]="aiService.isLoading()"
                class="px-2.5 py-1 rounded-full text-xs font-mono text-[#94A3B8] bg-[#0B0F19] border border-[#1E293B] hover:border-sky-500 hover:text-sky-300 transition-all shrink-0 cursor-pointer disabled:opacity-50">
                {{ prompt }}
              </button>
            }
          </div>

          <!-- Chat Messages Area -->
          <div #messagesContainer class="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-[#0E1524]/40">
            @for (msg of aiService.messages(); track msg.id) {
              <div
                class="flex flex-col"
                [class.items-end]="msg.role === 'user'"
                [class.items-start]="msg.role === 'assistant'">
                <div class="text-[10px] font-mono text-[#64748B] mb-1 px-1">
                  {{ msg.role === 'user' ? 'Recruiter / Technical Leader' : "Omkar's Architecture AI" }}
                </div>
                <div
                  class="max-w-[88%] rounded-2xl p-3.5 leading-relaxed text-xs sm:text-sm shadow-xs"
                  [class.bg-sky-500]="msg.role === 'user'"
                  [class.text-slate-950]="msg.role === 'user'"
                  [class.font-medium]="msg.role === 'user'"
                  [class.rounded-br-xs]="msg.role === 'user'"
                  [class.bg-[#0B0F19]]="msg.role === 'assistant'"
                  [class.text-[#F8FAFC]]="msg.role === 'assistant'"
                  [class.border]="msg.role === 'assistant'"
                  [class.border-[#1E293B]]="msg.role === 'assistant'"
                  [class.rounded-bl-xs]="msg.role === 'assistant'">
                  {{ msg.content }}
                </div>
              </div>
            }

            @if (aiService.isLoading()) {
              <div class="flex items-start gap-2 text-xs font-mono text-sky-400 p-2">
                <span class="inline-block w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                <span>Executing Workers AI Llama 3.2 inference...</span>
              </div>
            }
          </div>

          <!-- Input Box -->
          <div class="p-3 border-t border-[#1E293B] bg-[#0B0F19]">
            <form (ngSubmit)="handleSend()" class="flex items-center gap-2">
              <input
                type="text"
                [(ngModel)]="userInput"
                name="userQuery"
                placeholder="Ask about TPL Dataflow, PostGIS GiST, Koop.js, or .NET 8..."
                [disabled]="aiService.isLoading()"
                class="flex-1 px-3.5 py-2.5 rounded-xl border border-[#1E293B] bg-[#111827] text-[#F8FAFC] placeholder-[#64748B] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all" />
              <button
                type="submit"
                [disabled]="!userInput().trim() || aiService.isLoading()"
                aria-label="Send query"
                class="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-30 disabled:hover:bg-sky-500 text-slate-950 font-semibold text-xs transition-colors shrink-0 cursor-pointer flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    }
    </aside>
  `,
})
export class AiAssistantComponent implements AfterViewChecked {
  readonly aiService = inject(AiAssistantService);
  readonly userInput = signal<string>('');

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  sendPreset(prompt: string): void {
    this.aiService.sendMessage(prompt);
  }

  handleSend(): void {
    const text = this.userInput().trim();
    if (!text) return;
    this.aiService.sendMessage(text);
    this.userInput.set('');
  }
}
