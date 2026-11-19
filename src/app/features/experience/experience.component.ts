import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE_TIMELINE, EDUCATION_DATA, PROFILE_DATA } from '../../core/data/portfolio-data';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-16 md:py-24 border-t border-[#E8E5DF] dark:border-[#1C2436] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- LEFT COLUMN: Section Title, Overview, Education, & Resume Action -->
          <div class="lg:col-span-4">
            <div class="sticky top-24 space-y-6">
              <div>
                <div class="mb-3">
                  <span class="eyebrow-accent">
                    TENURE &amp; TRACK RECORD
                  </span>
                </div>
                <h2 class="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-stone-900 dark:text-white leading-[0.98]">
                  Experience
                </h2>
                <p class="mt-3 text-sm sm:text-base text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
                  3+ years of progressive software engineering tenure at Neilsoft Ltd. in Pune, India, advancing from Graduate Engineer Trainee to Junior Software Engineer, and currently Senior Software Engineer.
                </p>
              </div>

              <!-- Education Card (Frosted studio depth in light, obsidian in dark) -->
              <div class="studio-card p-6 shadow-2xs">
                <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E5DF] dark:border-[#1C2436]">
                  <span class="text-xs font-mono font-bold uppercase tracking-[0.14em] text-stone-900 dark:text-white">
                    EDUCATION
                  </span>
                  <span class="text-xs font-mono font-bold text-blue-700 dark:text-sky-400">
                    CGPA {{ education.cgpa }}
                  </span>
                </div>

                <h3 class="font-display text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
                  {{ education.degree }}
                </h3>
                <div class="text-xs font-semibold text-blue-700 dark:text-sky-400 mt-1 font-mono">
                  {{ education.institution }}
                </div>
                <div class="text-[11px] font-mono text-stone-500 dark:text-slate-400 mt-0.5">
                  {{ education.board }} • {{ education.period }}
                </div>

                <ul class="mt-4 space-y-1.5 text-xs text-stone-600 dark:text-slate-300 pt-3 border-t border-[#E8E5DF] dark:border-[#1C2436]">
                  @for (h of education.highlights; track h) {
                    <li class="flex items-start gap-1.5">
                      <span class="text-blue-600 dark:text-sky-400 font-mono">▪</span>
                      <span>{{ h }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Resume Action Card -->
              <div class="studio-card p-5 shadow-2xs">
                <div class="text-xs font-mono font-bold uppercase tracking-[0.16em] text-stone-900 dark:text-white mb-1">
                  CURRICULUM VITAE (PDF)
                </div>
                <p class="text-xs text-stone-600 dark:text-slate-400 mb-3.5 leading-relaxed font-normal">
                  Download Omkar Marwadi's complete resume including system architecture details and verified deliverables.
                </p>
                <a
                  [href]="profile.resumeUrl"
                  download="Omkar_Marwadi_Resume.pdf"
                  (click)="downloadNotice()"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs text-xs font-mono font-semibold uppercase tracking-[0.12em] bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-all shadow-xs cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Progressive Career Timeline -->
          <div class="lg:col-span-8">
            <div class="relative border-l border-[#E8E5DF] dark:border-[#1C2436] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
              @for (item of experience; track item.id) {
                <div class="relative group">
                  <!-- Timeline Node Indicator (Sharp solid square node) -->
                  <div
                    class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-none border border-stone-400 dark:border-slate-600 bg-white dark:bg-[#0E1320] transition-colors"
                    [class.border-blue-600]="item.isCurrent"
                    [class.dark:border-sky-400]="item.isCurrent"
                    [class.bg-blue-600]="item.isCurrent"
                    [class.dark:bg-sky-400]="item.isCurrent">
                  </div>

                  <!-- Role Header -->
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 class="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-stone-900 dark:text-white flex items-center gap-3">
                        {{ item.role }}
                        @if (item.isCurrent) {
                          <span class="tag-accent-clean text-[10px]">
                            CURRENT ROLE
                          </span>
                        }
                      </h3>
                      <div class="text-sm font-semibold text-blue-700 dark:text-sky-400 font-mono mt-0.5">
                        {{ item.company }} <span class="text-stone-400 dark:text-slate-500 font-normal">({{ item.location }})</span>
                      </div>
                    </div>
                    <span class="tag-clean text-[10px]">
                      {{ item.period }}
                    </span>
                  </div>

                  <!-- Description -->
                  @if (item.description) {
                    <p class="mt-2 text-sm text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
                      {{ item.description }}
                    </p>
                  }

                  <!-- Key Achievements List -->
                  <ul class="mt-4 space-y-2.5 text-xs sm:text-sm text-stone-700 dark:text-slate-300">
                    @for (ach of item.achievements; track ach) {
                      <li class="flex items-start gap-2">
                        <span class="text-blue-600 dark:text-sky-400 font-mono font-bold mt-0.5">▪</span>
                        <span class="leading-relaxed">{{ ach }}</span>
                      </li>
                    }
                  </ul>

                  <!-- Technologies Strip -->
                  <div class="mt-4 pt-3 border-t border-[#E8E5DF] dark:border-[#1C2436] flex flex-wrap gap-1.5">
                    @for (t of item.technologies; track t) {
                      <span class="tag-clean">
                        {{ t }}
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
  readonly profile = PROFILE_DATA;
  readonly toastService = inject(ToastService);

  downloadNotice(): void {
    this.toastService.show('Downloading Omkar Marwadi Resume (PDF)...', 'success');
  }
}
