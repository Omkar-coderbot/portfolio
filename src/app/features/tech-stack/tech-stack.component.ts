import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TECH_CATEGORIES } from '../../core/data/portfolio-data';
import { TechCategory } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="tech-stack" class="py-16 md:py-24 border-t border-[#E8E5DF] dark:border-[#1C2436] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header (Plain uppercase tracking, subtle accent border) -->
        <div class="max-w-3xl mb-10">
          <div class="mb-3">
            <span class="eyebrow-accent">
              ARCHITECTURE MATRIX
            </span>
          </div>
          <h2 class="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
            Core Technical Stack
          </h2>
          <p class="mt-3 text-base sm:text-lg text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
            Production-proven technologies designed for high throughput, bounded memory execution, and spatial precision across enterprise workloads.
          </p>
        </div>

        <!-- Pillar Filter Buttons (Clean plain uppercase tracking, no pills) -->
        <div class="flex flex-wrap gap-2 mb-10">
          <!-- All Tab -->
          <button
            type="button"
            (click)="activePillar.set('all')"
            [class.bg-stone-900]="activePillar() === 'all'"
            [class.text-white]="activePillar() === 'all'"
            [class.dark:bg-white]="activePillar() === 'all'"
            [class.dark:text-slate-950]="activePillar() === 'all'"
            [class.bg-white]="activePillar() !== 'all'"
            [class.text-stone-700]="activePillar() !== 'all'"
            [class.dark:bg-[#0E1320]]="activePillar() !== 'all'"
            [class.dark:text-slate-300]="activePillar() !== 'all'"
            class="px-3.5 py-1.5 rounded-xs text-xs font-mono uppercase tracking-[0.14em] font-semibold border border-[#E8E5DF] dark:border-[#1C2436] hover:border-stone-400 dark:hover:border-slate-600 transition-all cursor-pointer shadow-2xs">
            All Pillars ({{ allSkillsCount() }})
          </button>

          @for (cat of categories; track cat.id) {
            <button
              type="button"
              (click)="activePillar.set(cat.id)"
              [class.bg-stone-900]="activePillar() === cat.id"
              [class.text-white]="activePillar() === cat.id"
              [class.dark:bg-white]="activePillar() === cat.id"
              [class.dark:text-slate-950]="activePillar() === cat.id"
              [class.bg-white]="activePillar() !== cat.id"
              [class.text-stone-700]="activePillar() !== cat.id"
              [class.dark:bg-[#0E1320]]="activePillar() !== cat.id"
              [class.dark:text-slate-300]="activePillar() !== cat.id"
              class="px-3.5 py-1.5 rounded-xs text-xs font-mono uppercase tracking-[0.14em] font-semibold border border-[#E8E5DF] dark:border-[#1C2436] hover:border-stone-400 dark:hover:border-slate-600 transition-all cursor-pointer shadow-2xs">
              {{ cat.title.split('&')[0].trim() }}
            </button>
          }
        </div>

        <!-- Pillar Grid Display -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          @for (category of displayedCategories(); track category.id) {
            <div class="studio-card p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
              <div>
                <!-- Category Header -->
                <div class="flex items-center justify-between pb-4 border-b border-[#E8E5DF] dark:border-[#1C2436]">
                  <div>
                    <h3 class="font-display text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
                      {{ category.title }}
                    </h3>
                    <p class="text-xs text-stone-500 dark:text-slate-400 mt-0.5 font-mono">
                      {{ category.subtitle }}
                    </p>
                  </div>
                  <span class="tag-clean">
                    {{ category.skills.length }} Skills
                  </span>
                </div>

                <!-- Skills List -->
                <div class="mt-6 space-y-3.5">
                  @for (skill of category.skills; track skill.name) {
                    <div class="p-3.5 rounded-xs border border-[#E8E5DF] dark:border-[#1C2436] bg-[#FAF9F6] dark:bg-[#080C16] hover:border-stone-300 dark:hover:border-slate-700 transition-colors">
                      <div class="flex items-center justify-between">
                        <span class="font-mono text-xs font-bold text-stone-900 dark:text-white flex items-center gap-2">
                          <span class="text-blue-600 dark:text-sky-400 font-mono font-bold">▪</span>
                          {{ skill.name }}
                        </span>
                        @if (skill.highlight) {
                          <span class="text-[10px] font-mono uppercase tracking-[0.12em] font-bold text-blue-700 dark:text-sky-400">
                            CORE
                          </span>
                        }
                      </div>
                      <p class="mt-1 text-xs text-stone-600 dark:text-slate-400 leading-relaxed pl-3.5 font-normal">
                        {{ skill.description }}
                      </p>
                    </div>
                  }
                </div>
              </div>

              <!-- Pillar Footer Indicator -->
              <div class="mt-6 pt-4 border-t border-[#E8E5DF] dark:border-[#1C2436] text-[11px] font-mono text-stone-400 dark:text-slate-500 flex items-center justify-between uppercase tracking-wider">
                <span>Production Environment</span>
                <span class="text-stone-700 dark:text-slate-300 font-semibold">Neilsoft Ltd.</span>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class TechStackComponent {
  readonly categories: TechCategory[] = TECH_CATEGORIES;
  readonly activePillar = signal<string>('all');

  readonly displayedCategories = computed(() => {
    const active = this.activePillar();
    if (active === 'all') {
      return this.categories;
    }
    return this.categories.filter((c) => c.id === active);
  });

  readonly allSkillsCount = computed(() => {
    return this.categories.reduce((acc, cat) => acc + cat.skills.length, 0);
  });
}
