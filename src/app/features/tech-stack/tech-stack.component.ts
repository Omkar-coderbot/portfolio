import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TECH_CATEGORIES } from '../../core/data/portfolio-data';
import { TechCategory } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="tech-stack" class="py-20 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#FAF9F6] dark:bg-[#0B0F19] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Title -->
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-blue-700 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800/80 mb-3">
            // ARCHITECTURE MATRIX
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            Core Technical Stack &amp; System Pillars
          </h2>
          <p class="mt-3 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8]">
            A production-proven technology stack designed for high throughput, predictable memory boundaries, and geospatial precision.
          </p>
        </div>

        <!-- Pillar Filter Buttons with SVG Category Icons -->
        <div class="mt-8 flex flex-wrap gap-2">
          <!-- All Tab -->
          <button
            type="button"
            (click)="activePillar.set('all')"
            [class.bg-blue-600]="activePillar() === 'all'"
            [class.text-white]="activePillar() === 'all'"
            [class.dark:bg-sky-500]="activePillar() === 'all'"
            [class.dark:text-slate-950]="activePillar() === 'all'"
            [class.font-semibold]="activePillar() === 'all'"
            [class.bg-white]="activePillar() !== 'all'"
            [class.text-[#475569]]="activePillar() !== 'all'"
            [class.dark:bg-[#111827]]="activePillar() !== 'all'"
            [class.dark:text-[#94A3B8]]="activePillar() !== 'all'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-[#334155] transition-all cursor-pointer shadow-xs flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>All Pillars</span>
          </button>

          <!-- Category 1: Backend & Distributed -->
          <button
            type="button"
            (click)="activePillar.set('backend')"
            [class.bg-blue-600]="activePillar() === 'backend'"
            [class.text-white]="activePillar() === 'backend'"
            [class.dark:bg-sky-500]="activePillar() === 'backend'"
            [class.dark:text-slate-950]="activePillar() === 'backend'"
            [class.font-semibold]="activePillar() === 'backend'"
            [class.bg-white]="activePillar() !== 'backend'"
            [class.text-[#475569]]="activePillar() !== 'backend'"
            [class.dark:bg-[#111827]]="activePillar() !== 'backend'"
            [class.dark:text-[#94A3B8]]="activePillar() !== 'backend'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-[#334155] transition-all cursor-pointer shadow-xs flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            <span>Backend &amp; Distributed</span>
          </button>

          <!-- Category 2: Spatial & Databases -->
          <button
            type="button"
            (click)="activePillar.set('spatial')"
            [class.bg-blue-600]="activePillar() === 'spatial'"
            [class.text-white]="activePillar() === 'spatial'"
            [class.dark:bg-sky-500]="activePillar() === 'spatial'"
            [class.dark:text-slate-950]="activePillar() === 'spatial'"
            [class.font-semibold]="activePillar() === 'spatial'"
            [class.bg-white]="activePillar() !== 'spatial'"
            [class.text-[#475569]]="activePillar() !== 'spatial'"
            [class.dark:bg-[#111827]]="activePillar() !== 'spatial'"
            [class.dark:text-[#94A3B8]]="activePillar() !== 'spatial'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-[#334155] transition-all cursor-pointer shadow-xs flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Spatial &amp; Databases</span>
          </button>

          <!-- Category 3: Cloud & DevOps -->
          <button
            type="button"
            (click)="activePillar.set('cloud')"
            [class.bg-blue-600]="activePillar() === 'cloud'"
            [class.text-white]="activePillar() === 'cloud'"
            [class.dark:bg-sky-500]="activePillar() === 'cloud'"
            [class.dark:text-slate-950]="activePillar() === 'cloud'"
            [class.font-semibold]="activePillar() === 'cloud'"
            [class.bg-white]="activePillar() !== 'cloud'"
            [class.text-[#475569]]="activePillar() !== 'cloud'"
            [class.dark:bg-[#111827]]="activePillar() !== 'cloud'"
            [class.dark:text-[#94A3B8]]="activePillar() !== 'cloud'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-[#334155] transition-all cursor-pointer shadow-xs flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span>Cloud &amp; DevOps</span>
          </button>

          <!-- Category 4: Frontend & AI -->
          <button
            type="button"
            (click)="activePillar.set('frontend-ai')"
            [class.bg-blue-600]="activePillar() === 'frontend-ai'"
            [class.text-white]="activePillar() === 'frontend-ai'"
            [class.dark:bg-sky-500]="activePillar() === 'frontend-ai'"
            [class.dark:text-slate-950]="activePillar() === 'frontend-ai'"
            [class.font-semibold]="activePillar() === 'frontend-ai'"
            [class.bg-white]="activePillar() !== 'frontend-ai'"
            [class.text-[#475569]]="activePillar() !== 'frontend-ai'"
            [class.dark:bg-[#111827]]="activePillar() !== 'frontend-ai'"
            [class.dark:text-[#94A3B8]]="activePillar() !== 'frontend-ai'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-[#334155] transition-all cursor-pointer shadow-xs flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Frontend &amp; AI</span>
          </button>
        </div>

        <!-- 4-Pillar Layout -->
        <div class="mt-10 space-y-10">
          @for (pillar of visiblePillars(); track pillar.id) {
            <div class="rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-6 sm:p-8 shadow-telemetry transition-colors duration-200">
              <!-- Pillar Header -->
              <div class="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 class="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                    {{ pillar.title }}
                  </h3>
                  <p class="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-0.5">
                    {{ pillar.subtitle }}
                  </p>
                </div>
                <span class="text-xs font-mono text-blue-700 dark:text-sky-400 self-start sm:self-auto bg-blue-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-sky-800/80">
                  {{ pillar.skills.length }} Technologies
                </span>
              </div>

              <!-- High-Signal Skill Cards (Clean 1-line capabilities, zero repetitive vanity badges) -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                @for (skill of pillar.skills; track skill.name) {
                  <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/90 border border-slate-200/80 dark:border-[#1E293B] hover:border-blue-400 dark:hover:border-sky-500/50 hover:bg-white dark:hover:bg-[#111827] transition-all group shadow-2xs">
                    <div class="font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-sm group-hover:text-blue-700 dark:group-hover:text-sky-400 transition-colors">
                      {{ skill.name }}
                    </div>
                    <p class="mt-1.5 text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed font-normal">
                      {{ skill.description }}
                    </p>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TechStackComponent {
  readonly categories = TECH_CATEGORIES;
  readonly activePillar = signal<string>('all');

  readonly visiblePillars = computed<TechCategory[]>(() => {
    const filter = this.activePillar();
    if (filter === 'all') {
      return this.categories;
    }
    return this.categories.filter((cat) => cat.id === filter);
  });
}
