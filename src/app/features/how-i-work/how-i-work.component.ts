import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HOW_I_WORK } from '../../core/data/portfolio-data';
import { HowIWorkPillar } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-how-i-work',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="how-i-work" class="py-16 md:py-24 border-t border-[#E8E5DF] dark:border-[#1C2436] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header (Plain uppercase tracking, subtle accent border, no code comment prefixes) -->
        <div class="max-w-3xl mb-12 sm:mb-16">
          <div class="mb-3">
            <span class="eyebrow-accent">
              ENGINEERING METHODOLOGY
            </span>
          </div>
          <h2 class="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
            How I Work
          </h2>
          <p class="mt-3 text-base sm:text-lg text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
            A grounded engineering approach focused on direct client technical alignment, disciplined team mentorship, and practical performance in production.
          </p>
        </div>

        <!-- 3-Column Clean Grid (Frosted Studio Cards in Light, Deep Obsidian in Dark) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          @for (pillar of pillars; track pillar.id; let i = $index) {
            <div class="studio-card p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
              <div>
                <!-- Top Indicator & Pillar Number -->
                <div class="flex items-center justify-between pb-4 border-b border-[#E8E5DF] dark:border-[#1C2436]">
                  <!-- Pillar Icon Box -->
                  <div class="w-9 h-9 rounded-xs bg-stone-100 dark:bg-[#131A2C] border border-[#E8E5DF] dark:border-[#1C2436] text-blue-700 dark:text-sky-400 flex items-center justify-center">
                    @if (pillar.icon === 'poc') {
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    } @else if (pillar.icon === 'mentor') {
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    } @else {
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    }
                  </div>

                  <span class="font-mono text-xs font-semibold text-stone-400 dark:text-slate-500 uppercase tracking-[0.18em]">
                    PILLAR 0{{ i + 1 }}
                  </span>
                </div>

                <!-- Pillar Title & Tagline -->
                <div class="mt-6">
                  <h3 class="font-display text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white leading-tight">
                    {{ pillar.title }}
                  </h3>
                  <div class="mt-1 text-xs font-mono text-blue-700 dark:text-sky-400 font-semibold uppercase tracking-wide">
                    {{ pillar.tagline }}
                  </div>
                  <p class="mt-3 text-sm text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
                    {{ pillar.summary }}
                  </p>
                </div>

                <!-- Structured Practices Checklist -->
                <div class="mt-6 pt-5 border-t border-[#E8E5DF] dark:border-[#1C2436]">
                  <div class="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-400 dark:text-slate-400 mb-3 font-semibold">
                    Core Practices:
                  </div>
                  <ul class="space-y-2.5 text-xs text-stone-700 dark:text-slate-300">
                    @for (practice of pillar.keyPractices; track practice) {
                      <li class="flex items-start gap-2">
                        <span class="text-blue-600 dark:text-sky-400 font-mono font-bold shrink-0">▪</span>
                        <span class="leading-relaxed">{{ practice }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>

              <!-- Bottom Indicator -->
              <div class="mt-6 pt-4 border-t border-[#E8E5DF] dark:border-[#1C2436] text-[11px] font-mono text-stone-400 dark:text-slate-500 flex items-center justify-between uppercase tracking-wider">
                <span>Production Standard</span>
                <span class="text-stone-700 dark:text-slate-300 font-semibold">Neilsoft Ltd.</span>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class HowIWorkComponent {
  readonly pillars: HowIWorkPillar[] = HOW_I_WORK;
}
