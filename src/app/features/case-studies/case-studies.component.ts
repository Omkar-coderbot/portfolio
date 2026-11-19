import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CASE_STUDIES } from '../../core/data/portfolio-data';
import { CaseStudy, ProjectMediaView } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="case-studies" class="py-16 md:py-24 border-t border-[#E8E5DF] dark:border-[#1C2436] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header (Plain uppercase tracking, subtle thin border accent) -->
        <div class="max-w-3xl mb-12 sm:mb-16">
          <div class="mb-3">
            <span class="eyebrow-accent">
              PRODUCTION CASE STUDIES
            </span>
          </div>
          <h2 class="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
            Selected Work
          </h2>
          <p class="mt-3 text-base sm:text-lg text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
            Engineering execution across large-scale parcel valuation, browser computational geometry, and serverless spatial data pipelines at Neilsoft Ltd.
          </p>
        </div>

        <!-- Split Project / Case-Study Cards -->
        <div class="space-y-12 sm:space-y-16">
          @for (cs of caseStudies; track cs.id; let i = $index) {
            <article class="studio-card overflow-hidden shadow-2xs">
              <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                
                <!-- LEFT COLUMN: Dedicated Image & Visual Slot for Real Project Media -->
                <div class="lg:col-span-5 bg-[#080B12] text-white p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#1C2436] flex flex-col justify-between">
                  <div>
                    <!-- Visual Slot Header & Switcher (if multi-view) -->
                    <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#1C2436] text-xs font-mono">
                      <span class="text-slate-400 uppercase tracking-[0.16em] text-[11px] font-semibold">
                        Visual Preview:
                      </span>

                      <!-- Media View Switcher (for Spatial Massing Tool: 3D Cesium vs 2D Konva) -->
                      @if (cs.mediaSlot.type === 'switcher') {
                        <div class="inline-flex rounded-xs border border-slate-700 bg-slate-900/90 p-0.5">
                          @for (v of cs.mediaSlot.views; track v.id) {
                            <button
                              type="button"
                              (click)="selectMediaView(cs.id, v.id)"
                              [class.bg-blue-600]="getActiveViewId(cs) === v.id"
                              [class.text-white]="getActiveViewId(cs) === v.id"
                              [class.text-slate-400]="getActiveViewId(cs) !== v.id"
                              class="px-2.5 py-1 text-[11px] font-mono uppercase font-semibold rounded-2xs transition-colors cursor-pointer">
                              {{ v.label }}
                            </button>
                          }
                        </div>
                      } @else {
                        <span class="text-[11px] text-slate-400 font-mono tracking-wide">
                          {{ cs.mediaSlot.views[0].label }}
                        </span>
                      }
                    </div>

                    <!-- Clean Media Viewport Container with Clean Aspect Ratio -->
                    @let activeView = getActiveView(cs);
                    <div class="relative w-full aspect-[16/10] rounded-xs bg-[#05070D] border border-slate-800/80 overflow-hidden flex items-center justify-center group/media">
                      <img
                        [src]="activeView.assetUrl"
                        [alt]="activeView.alt"
                        loading="lazy"
                        class="w-full h-full object-contain p-1 transition-transform duration-300 group-hover/media:scale-[1.02]" />
                    </div>

                    <!-- Structured Caption -->
                    <div class="mt-3.5 text-xs text-slate-300 font-mono leading-snug">
                      <div class="font-semibold text-slate-200">
                        {{ activeView.caption }}
                      </div>
                      @if (activeView.description) {
                        <p class="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed">
                          {{ activeView.description }}
                        </p>
                      }
                    </div>
                  </div>

                  <!-- Key Metric Readouts Strip at bottom of Visual Column -->
                  <div class="pt-4 mt-4 border-t border-[#1C2436] grid grid-cols-3 gap-2 text-center font-mono">
                    @for (m of cs.metrics; track m.label) {
                      <div class="p-2 rounded-xs bg-[#0A0E18] border border-[#1C2436]">
                        <div class="font-display font-bold text-base sm:text-lg text-sky-400 leading-tight">
                          {{ m.value }}
                        </div>
                        <div class="text-[10px] text-slate-400 mt-0.5 truncate tracking-wide">
                          {{ m.label }}
                        </div>
                      </div>
                    }
                  </div>
                </div>

                <!-- RIGHT COLUMN: Title, Concise Description, Two Structured Columns, and Details Action -->
                <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white/90 dark:bg-[#0E1320]/90">
                  <div>
                    <!-- Scale Eyebrow Badge (No pills, no code comments) -->
                    <div class="flex flex-wrap items-center gap-3 mb-3">
                      <span class="tag-accent-clean">
                        {{ cs.scaleBadge }}
                      </span>
                      <span class="text-xs font-mono uppercase tracking-[0.14em] text-stone-500 dark:text-slate-400">
                        Case 0{{ i + 1 }}
                      </span>
                    </div>

                    <!-- Major Title in Bold Condensed Display Typography -->
                    <h3 class="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-stone-900 dark:text-white leading-[1.05]">
                      {{ cs.title }}
                    </h3>

                    <!-- Subtitle -->
                    <div class="mt-1 text-xs font-mono font-semibold text-blue-700 dark:text-sky-400 uppercase tracking-wide">
                      {{ cs.subtitle }}
                    </div>

                    <!-- Concise Grounded Description -->
                    <p class="mt-3 text-sm sm:text-base text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
                      {{ cs.description }}
                    </p>

                    <!-- TWO STRUCTURED COLUMNS -->
                    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <!-- Column 1: Operational Performance -->
                      <div class="p-4 rounded-xs border border-[#E8E5DF] dark:border-[#1C2436] bg-[#FAF9F6] dark:bg-[#080C16]">
                        <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#E8E5DF] dark:border-[#1C2436]">
                          <span class="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                            {{ cs.columnLeft.title }}
                          </span>
                          @if (cs.columnLeft.badge) {
                            <span class="text-[10px] font-mono uppercase tracking-wider text-blue-700 dark:text-sky-400 font-semibold">
                              {{ cs.columnLeft.badge }}
                            </span>
                          }
                        </div>
                        <ul class="space-y-3">
                          @for (item of cs.columnLeft.items; track item.label) {
                            <li>
                              <div class="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-400 dark:text-slate-500 font-medium">
                                {{ item.label }}
                              </div>
                              <div class="text-xs font-semibold text-stone-900 dark:text-white mt-0.5">
                                {{ item.value }}
                              </div>
                              @if (item.detail) {
                                <div class="text-[11px] text-stone-500 dark:text-slate-400 mt-0.5 leading-snug">
                                  {{ item.detail }}
                                </div>
                              }
                            </li>
                          }
                        </ul>
                      </div>

                      <!-- Column 2: System Implementation -->
                      <div class="p-4 rounded-xs border border-[#E8E5DF] dark:border-[#1C2436] bg-[#FAF9F6] dark:bg-[#080C16]">
                        <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#E8E5DF] dark:border-[#1C2436]">
                          <span class="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                            {{ cs.columnRight.title }}
                          </span>
                          @if (cs.columnRight.badge) {
                            <span class="text-[10px] font-mono uppercase tracking-wider text-blue-700 dark:text-sky-400 font-semibold">
                              {{ cs.columnRight.badge }}
                            </span>
                          }
                        </div>
                        <ul class="space-y-3">
                          @for (item of cs.columnRight.items; track item.label) {
                            <li>
                              <div class="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-400 dark:text-slate-500 font-medium">
                                {{ item.label }}
                              </div>
                              <div class="text-xs font-semibold text-stone-900 dark:text-white mt-0.5">
                                {{ item.value }}
                              </div>
                              @if (item.detail) {
                                <div class="text-[11px] text-stone-500 dark:text-slate-400 mt-0.5 leading-snug">
                                  {{ item.detail }}
                                </div>
                              }
                            </li>
                          }
                        </ul>
                      </div>

                    </div>
                  </div>

                  <!-- Bottom: Stack Tags & Details Action -->
                  <div class="mt-6 pt-5 border-t border-[#E8E5DF] dark:border-[#1C2436] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <!-- Tech Tags (Clean thin border tags) -->
                    <div class="flex flex-wrap items-center gap-1.5 max-w-md">
                      @for (tag of cs.tags; track tag) {
                        <span class="tag-clean">
                          {{ tag }}
                        </span>
                      }
                    </div>

                    <!-- Details Action Button -->
                    <button
                      type="button"
                      (click)="openDeepDive(cs)"
                      class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs text-xs font-mono font-semibold uppercase tracking-[0.12em] bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-all cursor-pointer shadow-2xs shrink-0">
                      <span>Inspect Breakdown</span>
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </article>
          }
        </div>

      </div>

      <!-- TECHNICAL BREAKDOWN MODAL -->
      @if (activeModal(); as selected) {
        <div class="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div
            class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xs bg-white dark:bg-[#0E1320] border border-[#E8E5DF] dark:border-[#1C2436] p-6 sm:p-8 text-stone-900 dark:text-white shadow-2xl"
            (click)="$event.stopPropagation()">
            
            <!-- Modal Header -->
            <div class="flex items-start justify-between pb-4 border-b border-[#E8E5DF] dark:border-[#1C2436]">
              <div>
                <span class="eyebrow-accent mb-2">
                  TECHNICAL BREAKDOWN &amp; POST-MORTEM
                </span>
                <h3 class="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1">
                  {{ selected.title }}
                </h3>
                <p class="text-xs sm:text-sm text-stone-500 dark:text-slate-400 font-mono mt-0.5">
                  {{ selected.subtitle }}
                </p>
              </div>

              <button
                type="button"
                (click)="closeDeepDive()"
                aria-label="Close breakdown"
                class="p-2 rounded-xs text-stone-400 hover:text-stone-700 dark:text-slate-500 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Content -->
            <div class="mt-6 space-y-6 text-sm">
              <!-- Problem -->
              <div>
                <div class="text-xs font-mono font-bold uppercase tracking-[0.16em] text-rose-600 dark:text-rose-400 mb-1.5">
                  Problem Statement &amp; Bottlenecks
                </div>
                <p class="text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
                  {{ selected.problem }}
                </p>
              </div>

              <!-- Hard Technical Decision -->
              <div>
                <div class="text-xs font-mono font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-sky-400 mb-1.5">
                  Architectural Strategy &amp; Trade-offs
                </div>
                <p class="text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
                  {{ selected.hardDecision }}
                </p>
              </div>

              <!-- What Broke First & Production Fix -->
              <div class="p-4 sm:p-5 rounded-xs border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-[#151208] space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">
                  Post-Mortem: What Broke First &amp; Production Fix
                </div>
                
                <div class="text-xs">
                  <span class="font-bold text-amber-900 dark:text-amber-200">What Broke: </span>
                  <span class="text-amber-950 dark:text-amber-300/90">{{ selected.whatBrokeFirstAndFix.broke }}</span>
                </div>
                
                <div class="text-xs">
                  <span class="font-bold text-amber-900 dark:text-amber-200">Production Fix: </span>
                  <span class="text-amber-950 dark:text-amber-300/90">{{ selected.whatBrokeFirstAndFix.fix }}</span>
                </div>
                
                <div class="text-xs pt-1 border-t border-amber-200 dark:border-amber-900/60 font-mono text-emerald-800 dark:text-emerald-300 font-semibold">
                  Outcome: {{ selected.whatBrokeFirstAndFix.outcome }}
                </div>
              </div>

              <!-- Key Architecture Highlights -->
              <div>
                <div class="text-xs font-mono font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400 mb-2">
                  Verified System Highlights
                </div>
                <ul class="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-sans">
                  @for (highlight of selected.architectureHighlights; track highlight) {
                    <li class="flex items-start gap-2">
                      <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold">▪</span>
                      <span>{{ highlight }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Stack Tags -->
              <div class="pt-4 border-t border-[#E8E5DF] dark:border-[#1C2436]">
                <div class="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-500 dark:text-slate-400 mb-2 font-medium">Verified Stack:</div>
                <div class="flex flex-wrap gap-1.5">
                  @for (t of selected.tags; track t) {
                    <span class="tag-clean">
                      {{ t }}
                    </span>
                  }
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="mt-6 pt-4 border-t border-[#E8E5DF] dark:border-[#1C2436] flex justify-end">
              <button
                type="button"
                (click)="closeDeepDive()"
                class="px-4 py-2 rounded-xs text-xs font-mono uppercase font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-900 dark:text-white transition-colors cursor-pointer">
                Close
              </button>
            </div>

          </div>
        </div>
      }
    </section>
  `,
})
export class CaseStudiesComponent {
  readonly caseStudies = CASE_STUDIES;
  readonly activeModal = signal<CaseStudy | null>(null);

  // Active view tracking for multi-view media slots (e.g. 3D Cesium vs 2D Konva)
  readonly activeMediaViews = signal<Record<string, string>>({
    'spatial-massing-tool': 'cesium-3d',
  });

  getActiveViewId(cs: CaseStudy): string {
    return this.activeMediaViews()[cs.id] || cs.mediaSlot.defaultViewId || cs.mediaSlot.views[0].id;
  }

  getActiveView(cs: CaseStudy): ProjectMediaView {
    const activeId = this.getActiveViewId(cs);
    return cs.mediaSlot.views.find((v) => v.id === activeId) || cs.mediaSlot.views[0];
  }

  selectMediaView(caseStudyId: string, viewId: string): void {
    this.activeMediaViews.update((prev) => ({
      ...prev,
      [caseStudyId]: viewId,
    }));
  }

  openDeepDive(cs: CaseStudy): void {
    this.activeModal.set(cs);
    document.body.style.overflow = 'hidden';
  }

  closeDeepDive(): void {
    this.activeModal.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeModal()) {
      this.closeDeepDive();
    }
  }
}
