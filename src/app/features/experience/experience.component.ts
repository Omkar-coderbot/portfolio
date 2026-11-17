import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE_TIMELINE, EDUCATION_DATA } from '../../core/data/portfolio-data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-20 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#FAF9F6] dark:bg-[#0B0F19] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Left Column: Sticky Title & Education -->
          <div class="lg:col-span-4">
            <div class="sticky top-24">
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-blue-700 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800/80 mb-3">
                // TRACK RECORD
              </div>
              <h2 class="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                Experience &amp; Education
              </h2>
              <p class="mt-3 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Progressive engineering tenure designing enterprise cloud infrastructure, high-throughput spatial data pipelines, and distributed backend systems.
              </p>

              <!-- Education Card (Dual Theme: Warm Alabaster Card / Charcoal Slate) -->
              <div class="mt-8 p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] shadow-telemetry transition-colors duration-200">
                <div class="flex items-center justify-between text-xs font-mono text-[#475569] dark:text-[#94A3B8] mb-2">
                  <span>EDUCATION</span>
                  <span class="px-2 py-0.5 rounded bg-blue-50 dark:bg-sky-950/70 text-blue-700 dark:text-sky-300 font-bold border border-blue-200 dark:border-sky-800/80">
                    CGPA: {{ education.cgpa }}
                  </span>
                </div>
                <h3 class="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  {{ education.degree }}
                </h3>
                <p class="text-xs text-[#334155] dark:text-[#94A3B8] font-medium mt-1">
                  {{ education.institution }}
                </p>
                <p class="text-xs text-[#64748B] font-mono mt-0.5">
                  {{ education.board }} • {{ education.period }}
                </p>
                <ul class="mt-3 space-y-1.5 text-xs text-[#475569] dark:text-[#94A3B8] border-t border-[#E2E8F0] dark:border-[#1E293B] pt-3">
                  @for (h of education.highlights; track h) {
                    <li class="flex items-start gap-1.5">
                      <span class="text-blue-600 dark:text-sky-400">•</span>
                      <span>{{ h }}</span>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>

          <!-- Right Column: Vertical Timeline -->
          <div class="lg:col-span-8">
            <div class="relative border-l border-slate-300 dark:border-[#1E293B] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
              @for (item of experience; track item.id) {
                <div class="relative group">
                  <!-- Timeline Node Indicator -->
                  <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#FAF9F6] dark:bg-[#0B0F19] transition-colors"
                    [class.border-blue-600]="item.isCurrent"
                    [class.dark:border-sky-400]="item.isCurrent"
                    [class.border-slate-400]="!item.isCurrent"
                    [class.dark:border-[#334155]]="!item.isCurrent">
                    @if (item.isCurrent) {
                      <div class="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 mx-auto mt-0.5 animate-ping"></div>
                    }
                  </div>

                  <!-- Role Header -->
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 class="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
                        {{ item.role }}
                        @if (item.isCurrent) {
                          <span class="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            Current Role
                          </span>
                        }
                      </h3>
                      <div class="text-sm font-semibold text-blue-700 dark:text-sky-400">
                        {{ item.company }} <span class="text-[#64748B] dark:text-[#94A3B8] font-normal">({{ item.location }})</span>
                      </div>
                    </div>
                    <span class="text-xs font-mono font-medium text-[#475569] dark:text-[#94A3B8] px-2.5 py-1 rounded bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-[#1E293B]">
                      {{ item.period }}
                    </span>
                  </div>

                  <!-- Description -->
                  @if (item.description) {
                    <p class="mt-2 text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      {{ item.description }}
                    </p>
                  }

                  <!-- Key Achievements List -->
                  <ul class="mt-4 space-y-2.5 text-sm text-[#334155] dark:text-[#94A3B8]">
                    @for (ach of item.achievements; track ach) {
                      <li class="flex items-start gap-2.5 leading-relaxed">
                        <svg class="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span>{{ ach }}</span>
                      </li>
                    }
                  </ul>

                  <!-- Tech Badges -->
                  <div class="mt-4 flex flex-wrap gap-1.5">
                    @for (tech of item.technologies; track tech) {
                      <span class="px-2 py-0.5 rounded text-xs font-mono text-[#475569] dark:text-[#94A3B8] bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1E293B]">
                        {{ tech }}
                      </span>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly experience = EXPERIENCE_TIMELINE;
  readonly education = EDUCATION_DATA;
}
