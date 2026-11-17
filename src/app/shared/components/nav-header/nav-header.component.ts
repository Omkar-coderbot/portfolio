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
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF9F6]/85 dark:bg-[#0B0F19]/85 border-b border-[#E2E8F0] dark:border-[#1E293B] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Left: Monogram + Name + Live Status Dot -->
        <a href="#" class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-sky-500 rounded-md">
          <div class="w-8 h-8 rounded-lg bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] text-blue-700 dark:text-sky-400 flex items-center justify-center font-mono font-bold text-xs tracking-tight shadow-xs group-hover:border-blue-400 dark:group-hover:border-sky-500/50 transition-colors">
            OM
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-none group-hover:text-blue-700 dark:group-hover:text-sky-400 transition-colors">
              Omkar Marwadi
            </span>
            <span class="text-[11px] font-mono text-[#475569] dark:text-[#94A3B8] flex items-center gap-1.5 mt-1">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
              </span>
              Pune, India
            </span>
          </div>
        </a>

        <!-- Center: Text Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
          <a href="#case-studies" class="hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors">Case Studies</a>
          <a href="#tech-stack" class="hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors">Architecture Stack</a>
          <a href="#experience" class="hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors">Timeline</a>
          <button
            type="button"
            (click)="aiService.setOpen(true)"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-sky-950/60 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-sky-800/80 hover:bg-blue-100 dark:hover:bg-sky-900/60 transition-all cursor-pointer">
            <svg class="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Ask AI Assistant
          </button>
        </nav>

        <!-- Right Action Group -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Sun / Moon Theme Toggle Button -->
          <button
            type="button"
            (click)="themeService.toggleTheme()"
            [attr.aria-label]="themeService.isDark() ? 'Switch to Technical Blueprint (Light Mode)' : 'Switch to Spatial Telemetry (Dark Mode)'"
            class="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-200/60 dark:hover:bg-zinc-800 border border-transparent hover:border-slate-300 dark:hover:border-zinc-700 transition-all cursor-pointer">
            @if (themeService.isDark()) {
              <!-- Sun Icon for Light Mode switch -->
              <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            } @else {
              <!-- Moon Icon for Dark Mode switch -->
              <svg class="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            }
          </button>

          <!-- Copy Email: Secondary Outline Button -->
          <button
            type="button"
            (click)="copyEmail()"
            class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-[#CBD5E1] dark:border-[#334155] hover:border-slate-400 dark:hover:border-slate-500 bg-white/80 dark:bg-[#111827]/80 text-[#0F172A] dark:text-[#F8FAFC] transition-colors cursor-pointer shadow-xs">
            <svg class="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {{ emailCopied() ? 'Email Copied' : 'Copy Email' }}
          </button>

          <!-- Download Resume: Primary Solid Button -->
          <button
            type="button"
            (click)="downloadResume()"
            class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 transition-all shadow-sm cursor-pointer hover:shadow">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Resume</span>
          </button>
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
    navigator.clipboard.writeText(this.profile.email);
    this.emailCopied.set(true);
    this.toastService.show(`Copied to clipboard: ${this.profile.email}`, 'success');
    setTimeout(() => this.emailCopied.set(false), 2000);
  }

  async downloadResume(): Promise<void> {
    const resumeUrl = this.profile.resumeUrl;
    try {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Omkar_Marwadi_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.toastService.show('Resume PDF downloaded', 'success');
    } catch (err) {
      window.open(resumeUrl, '_blank');
      this.toastService.show('Opening Resume PDF...', 'info');
    }
  }
}
