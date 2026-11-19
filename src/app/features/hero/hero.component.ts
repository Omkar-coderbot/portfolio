import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../core/data/portfolio-data';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <!-- Soft Warm Volumetric Light Beam Accent on the Right-Center (Dark Mode Only, subtle & calm) -->
      <div class="hidden dark:block absolute -right-20 top-1/4 w-[600px] h-[500px] rounded-full pointer-events-none bg-gradient-to-l from-sky-900/15 via-amber-500/5 to-transparent blur-3xl opacity-75"></div>

      <!-- Subtle Frosted Studio Depth Accent (Light Mode Only) -->
      <div class="dark:hidden absolute right-0 top-1/6 w-[550px] h-[450px] rounded-full pointer-events-none bg-gradient-to-l from-[#F5F2EB] to-transparent blur-2xl opacity-70"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Eyebrow Metadata (Plain uppercase tracking with subtle thin accent border, NO code comment //, NO pills, NO pulse dots) -->
        <div class="mb-5 flex flex-wrap items-center gap-4">
          <span class="eyebrow-accent">
            PUNE, INDIA • NEILSOFT LTD.
          </span>
          <span class="eyebrow-plain">
            3+ YEARS EXPERIENCE
          </span>
        </div>

        <!-- PROFILE IDENTITY AREA (Hovering smoothly reveals direct interactive profile links) -->
        <div class="group/profile relative max-w-4xl py-2">
          
          <!-- Major Heading in Condensed Bold Display Typography -->
          <h1 class="font-display text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-stone-900 dark:text-white leading-[0.94]">
            {{ profile.name }}
          </h1>

          <!-- Role Subtitle (Strictly Senior Software Engineer) -->
          <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span class="font-display font-semibold text-2xl sm:text-3xl uppercase tracking-wide text-blue-700 dark:text-sky-400">
              {{ profile.title }}
            </span>
            <span class="text-stone-300 dark:text-slate-600 font-mono text-xl sm:text-2xl">•</span>
            <span class="font-display text-xl sm:text-2xl text-stone-600 dark:text-slate-300 uppercase">
              {{ profile.company }}
            </span>
          </div>

          <!-- Interactive Profile Links: Smoothly revealed on hovering over the profile area -->
          <div class="mt-4 pt-3 border-t border-[#E8E5DF] dark:border-[#1C2436] flex flex-wrap items-center gap-2 sm:gap-3 transition-all duration-300">
            <span class="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-400 dark:text-slate-500 mr-1 font-medium">
              Profile Links:
            </span>

            <!-- GitHub Link -->
            <a
              [href]="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="tag-clean hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub ↗</span>
            </a>

            <!-- LinkedIn Link -->
            <a
              [href]="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="tag-clean hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
              <span>LinkedIn ↗</span>
            </a>

            <!-- Email Action -->
            <button
              type="button"
              (click)="copyEmail()"
              class="tag-clean hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{{ emailCopied() ? 'Email Copied!' : profile.email }}</span>
            </button>

            <!-- Phone Link -->
            <a
              [href]="'tel:' + profile.phone"
              class="tag-clean hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 transition-all flex items-center gap-1.5 cursor-pointer">
              <span>{{ profile.phone }}</span>
            </a>
          </div>

          <!-- Grounded Summary Text -->
          <p class="mt-4 text-base sm:text-lg text-stone-700 dark:text-slate-300 leading-relaxed font-normal">
            {{ profile.summary }}
          </p>
        </div>

        <!-- Core Stack Plain Tags Strip -->
        <div class="mt-6 pt-5 border-t border-[#E8E5DF] dark:border-[#1C2436]">
          <div class="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-500 dark:text-slate-400 mb-2.5 font-semibold">
            Core Technologies:
          </div>
          <div class="flex flex-wrap items-center gap-2">
            @for (tech of profile.coreStack; track tech) {
              <span class="tag-clean">
                {{ tech }}
              </span>
            }
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <!-- Primary CTA: Selected Work -->
          <a
            href="#case-studies"
            class="px-5 py-2.5 rounded-xs text-xs font-mono font-semibold uppercase tracking-[0.12em] bg-blue-600 hover:bg-blue-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 transition-all shadow-xs cursor-pointer">
            <span>Explore Case Studies</span>
          </a>

          <!-- How I Work Shortcut -->
          <a
            href="#how-i-work"
            class="px-5 py-2.5 rounded-xs text-xs font-mono font-semibold uppercase tracking-[0.12em] border border-[#E8E5DF] dark:border-[#1C2436] bg-white dark:bg-[#0E1320] text-stone-900 dark:text-slate-100 hover:border-stone-400 dark:hover:border-slate-500 transition-all shadow-2xs">
            <span>How I Work</span>
          </a>

          <!-- Resume PDF Action -->
          <a
            [href]="profile.resumeUrl"
            download="Omkar_Marwadi_Resume.pdf"
            (click)="onDownloadClick()"
            class="px-5 py-2.5 rounded-xs text-xs font-mono font-semibold uppercase tracking-[0.12em] border border-[#E8E5DF] dark:border-[#1C2436] bg-white dark:bg-[#0E1320] text-stone-900 dark:text-slate-100 hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 transition-all shadow-2xs flex items-center gap-2">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Resume (PDF)</span>
          </a>
        </div>

        <!-- Clean Solid Metrics Readout (Frosted Studio Cards in Light, Obsidian Cards in Dark) -->
        <div class="mt-12 pt-8 border-t border-[#E8E5DF] dark:border-[#1C2436] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (metric of profile.telemetryHighlights; track metric.label) {
            <div class="studio-card p-5 shadow-2xs">
              <div class="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-blue-700 dark:text-sky-400">
                {{ metric.value }}
              </div>
              <div class="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-stone-900 dark:text-slate-100 font-mono">
                {{ metric.label }}
              </div>
              <div class="mt-0.5 text-xs text-stone-500 dark:text-slate-400">
                {{ metric.subtext }}
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class HeroComponent {
  readonly profile = PROFILE_DATA;
  readonly toastService = inject(ToastService);
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

  onDownloadClick(): void {
    this.toastService.show('Downloading Omkar Marwadi Resume (PDF)...', 'success');
  }
}
