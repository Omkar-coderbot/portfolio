import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { AiAssistantService } from '../../../core/services/ai-assistant.service';
import { ToastService } from '../../../core/services/toast.service';
import { PROFILE_DATA } from '../../../core/data/portfolio-data';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF9F6]/85 dark:bg-[#06080D]/85 border-b border-[#E8E5DF] dark:border-[#1C2436] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Profile Identity Area (Smoothly reveals profile links on hover/focus) -->
        <div class="relative group/identity py-2">
          <a
            href="#"
            class="flex items-center gap-3 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-xs">
            <!-- Monogram Box -->
            <div class="w-9 h-9 rounded-xs bg-white dark:bg-[#0E1320] border border-[#E8E5DF] dark:border-[#1C2436] text-stone-900 dark:text-slate-100 flex items-center justify-center font-display font-bold text-sm tracking-tight shadow-2xs group-hover/identity:border-blue-600 dark:group-hover/identity:border-sky-400 transition-colors">
              OM
            </div>

            <!-- Identity Info -->
            <div class="flex flex-col">
              <span class="font-display font-bold text-base sm:text-lg tracking-tight text-stone-900 dark:text-slate-100 leading-none group-hover/identity:text-blue-600 dark:group-hover/identity:text-sky-400 transition-colors uppercase">
                {{ profile.name }}
              </span>
              <span class="text-[11px] font-mono text-stone-500 dark:text-slate-400 mt-0.5 tracking-tight">
                {{ profile.title }} • {{ profile.company }}
              </span>
            </div>
          </a>

          <!-- Hover Popover: Smoothly reveals profile links on hover / focus -->
          <div
            class="absolute left-0 top-full mt-1 w-72 rounded-xs bg-white dark:bg-[#0E1320] border border-[#E8E5DF] dark:border-[#1C2436] p-2.5 shadow-xl opacity-0 invisible group-hover/identity:opacity-100 group-hover/identity:visible group-focus-within/identity:opacity-100 group-focus-within/identity:visible transition-all duration-200 translate-y-1 group-hover/identity:translate-y-0 z-50 pointer-events-auto">
            <div class="text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400 dark:text-slate-500 pb-1.5 mb-1.5 border-b border-[#E8E5DF] dark:border-[#1C2436]">
              Direct Profiles &amp; Contacts
            </div>
            <div class="space-y-1 text-xs font-mono">
              <a
                [href]="profile.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between px-2 py-1.5 rounded-xs hover:bg-stone-50 dark:hover:bg-slate-800/60 text-stone-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                <span class="flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </span>
                <span class="text-stone-400 dark:text-slate-500 text-[10px]">/omkarmarwadi ↗</span>
              </a>

              <a
                [href]="profile.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between px-2 py-1.5 rounded-xs hover:bg-stone-50 dark:hover:bg-slate-800/60 text-stone-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                <span class="flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                  </svg>
                  <span>LinkedIn</span>
                </span>
                <span class="text-stone-400 dark:text-slate-500 text-[10px]">/in/omkarmarwadi ↗</span>
              </a>

              <button
                type="button"
                (click)="copyEmail()"
                class="w-full flex items-center justify-between px-2 py-1.5 rounded-xs hover:bg-stone-50 dark:hover:bg-slate-800/60 text-stone-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors text-left cursor-pointer">
                <span class="flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email</span>
                </span>
                <span class="text-blue-600 dark:text-sky-400 text-[10px] font-semibold">
                  {{ emailCopied() ? 'Copied' : 'Copy' }}
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Center: Text Navigation Links (Plain uppercase tracking, no code comment prefixes) -->
        <nav class="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-[0.14em] font-medium text-stone-600 dark:text-slate-300">
          <a href="#case-studies" class="hover:text-stone-900 dark:hover:text-white transition-colors">Case Studies</a>
          <a href="#how-i-work" class="hover:text-stone-900 dark:hover:text-white transition-colors">How I Work</a>
          <a href="#tech-stack" class="hover:text-stone-900 dark:hover:text-white transition-colors">Stack</a>
          <a href="#experience" class="hover:text-stone-900 dark:hover:text-white transition-colors">Experience</a>
          <button
            type="button"
            (click)="aiService.setOpen(true)"
            class="text-blue-700 dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer">
            <svg class="w-3 h-3 text-blue-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Ask AI</span>
          </button>
        </nav>

        <!-- Right: Actions -->
        <div class="flex items-center gap-3">
          <!-- Theme Toggle -->
          <button
            type="button"
            (click)="themeService.toggleTheme()"
            [attr.aria-label]="themeService.isDark() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            class="p-2 rounded-xs text-stone-600 hover:text-stone-900 dark:text-slate-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 border border-[#E8E5DF] dark:border-[#1C2436] transition-all cursor-pointer">
            @if (themeService.isDark()) {
              <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            } @else {
              <svg class="w-4 h-4 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            }
          </button>

          <!-- Resume PDF Download Action -->
          <a
            [href]="profile.resumeUrl"
            download="Omkar_Marwadi_Resume.pdf"
            (click)="trackResumeDownload()"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase font-semibold rounded-xs bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-all shadow-xs cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Resume (PDF)</span>
          </a>
        </div>

      </div>
    </header>
  `,
})
export class NavHeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly aiService = inject(AiAssistantService);
  readonly toastService = inject(ToastService);
  readonly profile = PROFILE_DATA;

  readonly emailCopied = signal<boolean>(false);

  copyEmail(): void {
    navigator.clipboard.writeText(this.profile.email).then(() => {
      this.emailCopied.set(true);
      this.toastService.show(`Email copied: ${this.profile.email}`, 'info');
      setTimeout(() => this.emailCopied.set(false), 2500);
    }).catch(() => {
      this.toastService.show(`Email: ${this.profile.email}`, 'info');
    });
  }

  trackResumeDownload(): void {
    this.toastService.show('Downloading Omkar Marwadi Resume (PDF)...', 'success');
  }
}
