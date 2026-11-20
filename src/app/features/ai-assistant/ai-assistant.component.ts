import {
  Component,
  inject,
  signal,
  computed,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiAssistantService } from '../../core/services/ai-assistant.service';
import { PROFILE_DATA } from '../../core/data/portfolio-data';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Understated Floating Launcher Widget (Collapsible "Ask About My Experience") -->
    <aside aria-label="AI Experience Assistant">
      <div class="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          (click)="aiService.toggleOpen()"
          [attr.aria-expanded]="aiService.isOpen()"
          aria-controls="experience-drawer"
          class="group flex items-center gap-2.5 px-3.5 py-2 rounded-xs bg-stone-900/95 dark:bg-white/95 backdrop-blur-md text-white dark:text-slate-950 border border-stone-700/80 dark:border-slate-300 shadow-xl transition-all cursor-pointer hover:bg-stone-800 dark:hover:bg-slate-100 font-mono text-xs font-semibold uppercase tracking-[0.12em]">
          <svg class="w-3.5 h-3.5 text-blue-400 dark:text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Ask About My Experience</span>
        </button>
      </div>

      <!-- Collapsible Drawer / Panel (Aligned with Alabaster Frosted & Obsidian Gradient Themes) -->
      @if (aiService.isOpen()) {
        <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 pointer-events-none">
          <!-- Mobile Backdrop -->
          <div
            class="fixed inset-0 bg-black/60 backdrop-blur-2xs sm:hidden pointer-events-auto"
            (click)="aiService.setOpen(false)"></div>

          <!-- Drawer Container -->
          <div
            id="experience-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qa-drawer-title"
            class="pointer-events-auto w-full sm:max-w-lg h-[92vh] sm:h-[640px] flex flex-col rounded-t-xs sm:rounded-xs border border-[#E8E5DF] dark:border-[#1C2436] bg-white/95 dark:bg-[#0A0E18]/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-150">
            
            <!-- Drawer Header -->
            <div class="p-4 border-b border-[#E8E5DF] dark:border-[#1C2436] bg-[#FAF9F6]/90 dark:bg-[#07090F]/90 flex items-center justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400"></span>
                  <h3 id="qa-drawer-title" class="text-xs font-mono font-bold uppercase tracking-[0.14em] text-stone-900 dark:text-white">
                    Ask About My Experience
                  </h3>
                </div>
              </div>

              <!-- Action Controls: Setup Note Toggle & Close Button -->
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  (click)="aiService.setOpen(false)"
                  aria-label="Close drawer"
                  class="p-1.5 rounded-xs text-stone-500 hover:text-stone-900 dark:text-slate-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>



            <!-- Suggested Starter Questions (Scrollable Chips) -->
            <div class="px-3.5 py-2.5 bg-[#FAF9F6]/60 dark:bg-[#07090F]/60 border-b border-[#E8E5DF] dark:border-[#1C2436] flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap">
              <span class="text-[10px] font-mono text-stone-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1">Starters:</span>
              @for (prompt of aiService.suggestedPrompts(); track prompt) {
                <button
                  type="button"
                  (click)="sendPreset(prompt)"
                  [disabled]="aiService.isLoading()"
                  class="tag-clean hover:border-blue-500 hover:text-blue-600 dark:hover:text-sky-300 transition-all shrink-0 cursor-pointer disabled:opacity-50 text-[11px]">
                  {{ prompt }}
                </button>
              }
            </div>

            <!-- Rate-Limit (429) & Quota (503) Alert Card -->
            @if (aiService.isRateLimited() || aiService.isServiceUnavailable()) {
              <div class="mx-4 mt-3 p-3 rounded-xs border border-amber-300 dark:border-amber-800/80 bg-amber-50/80 dark:bg-[#161208] text-xs font-mono text-amber-900 dark:text-amber-200 space-y-2">
                <div class="font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{{ aiService.isRateLimited() ? 'Per-IP Rate Limit Active' : 'Daily Free Quota Reached' }}</span>
                </div>
                <p class="leading-relaxed text-[11px]">
                  {{ aiService.errorMessage() }}
                </p>
                <div class="flex items-center gap-3 pt-1 border-t border-amber-200 dark:border-amber-900/60 text-[11px]">
                  <a [href]="'mailto:' + profile.email" class="text-blue-700 dark:text-sky-300 font-bold hover:underline">
                    Email Directly ↗
                  </a>
                  <a [href]="profile.linkedin" target="_blank" rel="noopener noreferrer" class="text-blue-700 dark:text-sky-300 font-bold hover:underline">
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            }

            <!-- Chat & Question Log Area -->
            <div #messagesContainer class="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-white dark:bg-[#0A0E18]">
              @for (msg of aiService.messages(); track msg.id) {
                <div
                  class="flex flex-col"
                  [class.items-end]="msg.role === 'user'"
                  [class.items-start]="msg.role === 'assistant'">
                  <div class="text-[10px] font-mono text-stone-400 dark:text-slate-500 mb-1 px-1 uppercase tracking-wider">
                    {{ msg.role === 'user' ? 'Your Question' : "Omkar's Assistant (Workers AI)" }}
                  </div>
                  <div
                    class="max-w-[90%] rounded-xs p-3.5 leading-relaxed text-xs sm:text-sm font-sans"
                    [class.bg-stone-900]="msg.role === 'user'"
                    [class.text-white]="msg.role === 'user'"
                    [class.bg-[#FAF9F6]]="msg.role === 'assistant'"
                    [class.dark:bg-[#111726]]="msg.role === 'assistant'"
                    [class.text-stone-800]="msg.role === 'assistant'"
                    [class.dark:text-slate-200]="msg.role === 'assistant'"
                    [class.border]="msg.role === 'assistant'"
                    [class.border-[#E8E5DF]]="msg.role === 'assistant'"
                    [class.dark:border-[#1C2436]]="msg.role === 'assistant'">
                    {{ msg.content }}
                  </div>
                </div>
              }

              <!-- Loading Indicator -->
              @if (aiService.isLoading()) {
                <div class="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-slate-400 p-2">
                  <span class="w-1.5 h-1.5 bg-blue-600 dark:bg-sky-400 animate-pulse"></span>
                  <span>Querying Cloudflare Workers AI Llama 3.1 8B...</span>
                </div>
              }
            </div>

            <!-- Input Safeguards Area with 300-Character Counter -->
            <div class="p-3.5 border-t border-[#E8E5DF] dark:border-[#1C2436] bg-[#FAF9F6] dark:bg-[#07090F]">
              <form (ngSubmit)="onSubmit()" class="space-y-2">
                <div class="relative">
                  <textarea
                    [(ngModel)]="userInput"
                    (input)="onInputChange()"
                    name="userInput"
                    rows="2"
                    maxlength="300"
                    [disabled]="aiService.isLoading()"
                    placeholder="Ask about .NET TPL Dataflow, PostGIS GiST, or Cesium.js..."
                    class="w-full px-3 py-2 pr-16 text-xs font-mono rounded-xs border border-[#E8E5DF] dark:border-[#1C2436] bg-white dark:bg-[#0E1320] text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-sky-400 disabled:opacity-50 resize-none"></textarea>

                  <!-- Real-time 300-Character Counter Badge -->
                  <div
                    class="absolute bottom-2.5 right-2.5 text-[10px] font-mono pointer-events-none"
                    [class.text-stone-400]="inputLength() <= 250"
                    [class.dark:text-slate-500]="inputLength() <= 250"
                    [class.text-amber-600]="inputLength() > 250 && inputLength() < 300"
                    [class.text-rose-600]="inputLength() >= 300"
                    [class.font-bold]="inputLength() >= 300">
                    {{ inputLength() }}/300
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono text-stone-400 dark:text-slate-500">
                    Stateless • 5 req/min per IP
                  </span>

                  <button
                    type="submit"
                    [disabled]="!isInputValid() || aiService.isLoading()"
                    class="px-4 py-1.5 rounded-xs text-xs font-mono uppercase font-semibold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-colors disabled:opacity-40 cursor-pointer shadow-2xs">
                    Send
                  </button>
                </div>
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
  readonly profile = PROFILE_DATA;

  // Signal for user input and computed character counter
  readonly userInput = signal<string>('');
  readonly showSetupInfo = signal<boolean>(false);

  readonly inputLength = computed(() => this.userInput().trim().length);
  readonly isInputValid = computed(() => {
    const len = this.inputLength();
    return len > 0 && len <= 300;
  });

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }

  onInputChange(): void {
    if (this.aiService.errorMessage()) {
      this.aiService.clearError();
    }
  }

  toggleSetupInfo(): void {
    this.showSetupInfo.update((v) => !v);
  }

  onSubmit(): void {
    const text = this.userInput().trim();
    if (!text || text.length > 300 || this.aiService.isLoading()) return;

    this.userInput.set('');
    this.aiService.sendQuestion(text);
  }

  sendPreset(prompt: string): void {
    if (this.aiService.isLoading()) return;
    this.aiService.sendQuestion(prompt);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.aiService.isOpen()) {
      this.aiService.setOpen(false);
    }
  }
}
