import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CASE_STUDIES } from '../../core/data/portfolio-data';
import { CaseStudy } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="case-studies" class="py-20 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#FAF9F6] dark:bg-[#0B0F19] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-blue-700 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800/80 mb-3">
            // ARCHITECTURE CASE STUDIES
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            Production Engineering &amp; Distributed Systems
          </h2>
          <p class="mt-3 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8]">
            Real-world systems under extreme load, high spatial complexity, and hard trade-offs. Anonymized enterprise implementations with full post-mortem breakdowns.
          </p>
        </div>

        <!-- Case Study Tabs Selector -->
        <div class="mt-10 flex gap-2 overflow-x-auto pb-2 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          @for (cs of caseStudies; track cs.id; let i = $index) {
            <button
              type="button"
              (click)="selectedCaseStudy.set(cs)"
              [class.border-blue-600]="selectedCaseStudy().id === cs.id"
              [class.text-blue-700]="selectedCaseStudy().id === cs.id"
              [class.dark:border-sky-400]="selectedCaseStudy().id === cs.id"
              [class.dark:text-sky-400]="selectedCaseStudy().id === cs.id"
              [class.text-[#475569]]="selectedCaseStudy().id !== cs.id"
              [class.dark:text-[#94A3B8]]="selectedCaseStudy().id !== cs.id"
              [class.border-transparent]="selectedCaseStudy().id !== cs.id"
              class="px-4 py-3 text-xs sm:text-sm font-medium border-b-2 hover:text-[#0F172A] dark:hover:text-[#F8FAFC] whitespace-nowrap transition-all cursor-pointer flex items-center gap-2">
              <span class="w-5 h-5 rounded flex items-center justify-center text-[11px] font-mono font-bold"
                [class.bg-blue-100]="selectedCaseStudy().id === cs.id"
                [class.text-blue-700]="selectedCaseStudy().id === cs.id"
                [class.dark:bg-sky-950]="selectedCaseStudy().id === cs.id"
                [class.dark:text-sky-300]="selectedCaseStudy().id === cs.id"
                [class.dark:border]="selectedCaseStudy().id === cs.id"
                [class.dark:border-sky-800]="selectedCaseStudy().id === cs.id"
                [class.bg-slate-200]="selectedCaseStudy().id !== cs.id"
                [class.dark:bg-[#111827]]="selectedCaseStudy().id !== cs.id"
                [class.text-[#475569]]="selectedCaseStudy().id !== cs.id"
                [class.dark:text-[#94A3B8]]="selectedCaseStudy().id !== cs.id">
                0{{ i + 1 }}
              </span>
              {{ cs.title.split('&')[0].trim() }}
            </button>
          }
        </div>

        <!-- Active Case Study Detail Card -->
        <article class="mt-8 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] shadow-telemetry overflow-hidden transition-colors duration-200">
          <!-- Card Header & Scale Metric Banner -->
          <div class="p-6 sm:p-8 border-b border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50/80 dark:bg-[#0E1524] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-2.5">
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {{ selectedCaseStudy().scaleBadge }}
                </span>
                @for (tag of selectedCaseStudy().tags; track tag) {
                  <span class="px-2 py-0.5 rounded text-xs font-mono text-[#475569] dark:text-[#94A3B8] bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1E293B]">
                    {{ tag }}
                  </span>
                }
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                {{ selectedCaseStudy().title }}
              </h3>
              <p class="mt-1.5 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                {{ selectedCaseStudy().subtitle }}
              </p>
            </div>

            <!-- Quantitative Metrics Strip (JetBrains Mono Numbers) -->
            <div class="flex items-center gap-3 sm:gap-4 shrink-0">
              @for (metric of selectedCaseStudy().metrics; track metric.label) {
                <div class="px-4 py-3 rounded-xl bg-white dark:bg-[#0B0F19] border border-[#E2E8F0] dark:border-[#1E293B] text-center shadow-xs">
                  <div class="text-xl sm:text-2xl font-mono font-bold tracking-tight text-blue-700 dark:text-sky-400">
                    {{ metric.value }}
                  </div>
                  <div class="text-[11px] font-medium text-[#475569] dark:text-[#94A3B8] mt-0.5">
                    {{ metric.label }}
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Architecture Diagram Section (Fixed Vertical Clipping: bg-[#070A11], p-6 md:p-8, min-h-[260px]) -->
          <div class="p-6 md:p-8 border-b border-[#E2E8F0] dark:border-[#1E293B] bg-slate-100/60 dark:bg-[#0B0F19]/60">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-mono text-blue-700 dark:text-sky-400 tracking-wider uppercase flex items-center gap-2 font-medium">
                <span class="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse"></span>
                System Flow &amp; Distributed Pipeline Architecture
              </span>
              <span class="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                Spatial Telemetry Vector Render
              </span>
            </div>

            <!-- Padded, unclipped dark slate telemetry canvas -->
            <div class="rounded-xl border border-slate-800 bg-[#070A11] p-6 md:p-8 overflow-x-auto min-h-[260px] flex items-center shadow-inner">
              @if (selectedCaseStudy().diagramType === 'tpl-dataflow') {
                <!-- Diagram 1: .NET 8 TPL Dataflow Pipeline (Unclipped 980x280) -->
                <svg viewBox="0 0 980 280" class="w-full min-w-[880px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
                    </marker>
                  </defs>

                  <!-- Node 1: Ingestion Stream -->
                  <g transform="translate(15, 35)">
                    <rect width="180" height="205" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="180" y2="0" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
                    <circle cx="28" cy="28" r="12" fill="#0B0F19" stroke="#334155" />
                    <path d="M22 25c0-1.5 2.7-3 6-3s6 1.5 6 3-2.7 3-6 3-6-1.5-6-3zm0 4c0 1.5 2.7 3 6 3s6-1.5 6-3m-12 4c0 1.5 2.7 3 6 3s6-1.5 6-3" stroke="#38BDF8" stroke-width="1.2" fill="none" />
                    <text x="50" y="32" fill="#38BDF8" font-size="11" font-family="monospace" font-weight="bold">INGESTION</text>
                    <text x="90" y="68" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">2M+ LA Parcels</text>
                    <text x="90" y="88" fill="#94A3B8" font-size="11" text-anchor="middle">GeoJSON Batches</text>
                    <rect x="16" y="108" width="148" height="40" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="90" y="128" fill="#38BDF8" font-size="10" font-family="monospace" text-anchor="middle">Unbounded Stream</text>
                    <text x="90" y="141" fill="#64748B" font-size="9" text-anchor="middle">Legacy: 1-Week Sync</text>
                    <text x="90" y="180" fill="#EF4444" font-size="10" font-family="monospace" text-anchor="middle">Memory Bloat &amp; Stalls</text>
                  </g>

                  <!-- Connector 1 -> 2 -->
                  <path d="M 195 137 L 235 137" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)" />

                  <!-- Node 2: BufferBlock (Bounded Valve) -->
                  <g transform="translate(240, 30)">
                    <rect width="200" height="215" rx="10" fill="#0E1726" stroke="#38BDF8" stroke-width="1.8" />
                    <line x1="0" y1="0" x2="200" y2="0" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />
                    <circle cx="30" cy="28" r="12" fill="#070A11" stroke="#1E293B" />
                    <path d="M24 28h12M30 22v12" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round" />
                    <text x="52" y="32" fill="#38BDF8" font-size="11" font-family="monospace" font-weight="bold">TPL BufferBlock&lt;T&gt;</text>
                    <text x="100" y="65" fill="#F8FAFC" font-size="15" font-weight="bold" text-anchor="middle">Backpressure Valve</text>
                    <rect x="18" y="85" width="164" height="52" rx="6" fill="#070A11" stroke="#0284C7" />
                    <text x="100" y="107" fill="#10B981" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">BoundedCapacity = 500</text>
                    <text x="100" y="125" fill="#94A3B8" font-size="10" text-anchor="middle">Flow Control Throttling</text>
                    <text x="100" y="165" fill="#F8FAFC" font-size="11" font-family="monospace" text-anchor="middle">RAM Flat: 1.2 GB</text>
                    <text x="100" y="185" fill="#10B981" font-size="10" text-anchor="middle">Zero OOM Stalls</text>
                  </g>

                  <!-- Connector 2 -> 3 -->
                  <path d="M 440 137 L 480 137" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)" />

                  <!-- Node 3: TransformBlock (Parallel Scoring Engine) -->
                  <g transform="translate(485, 20)">
                    <rect width="235" height="235" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="235" y2="0" stroke="#10B981" stroke-width="3" stroke-linecap="round" />
                    <circle cx="30" cy="28" r="12" fill="#0B0F19" stroke="#334155" />
                    <rect x="25" y="23" width="10" height="10" stroke="#10B981" stroke-width="1.2" fill="none" />
                    <text x="52" y="32" fill="#10B981" font-size="11" font-family="monospace" font-weight="bold">TransformBlock&lt;T, R&gt;</text>
                    <text x="117" y="62" fill="#F8FAFC" font-size="15" font-weight="bold" text-anchor="middle">Parallel Scoring</text>
                    <text x="117" y="82" fill="#94A3B8" font-size="11" text-anchor="middle">25+ Spatial &amp; Valuation Rules</text>
                    <rect x="18" y="100" width="200" height="38" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="117" y="123" fill="#F59E0B" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">MaxDegreeOfParallelism = 16</text>
                    <text x="117" y="158" fill="#94A3B8" font-size="10" text-anchor="middle">• Immutable Per-Parcel Records</text>
                    <text x="117" y="176" fill="#94A3B8" font-size="10" text-anchor="middle">• Zero Thread Lock Contention</text>
                    <text x="117" y="205" fill="#10B981" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">1,450 evals / second</text>
                  </g>

                  <!-- Connector 3 -> 4 -->
                  <path d="M 720 137 L 760 137" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)" />

                  <!-- Node 4: ActionBlock & Bulk PostgreSQL COPY -->
                  <g transform="translate(765, 30)">
                    <rect width="205" height="215" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="205" y2="0" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
                    <circle cx="30" cy="28" r="12" fill="#0B0F19" stroke="#334155" />
                    <path d="M30 22l6 3v4c0 4-3 6-6 7-3-1-6-3-6-7v-4l6-3z" stroke="#38BDF8" stroke-width="1.2" fill="none" />
                    <text x="52" y="32" fill="#38BDF8" font-size="10" font-family="monospace" font-weight="bold">ActionBlock + POLLY</text>
                    <text x="102" y="65" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">PostgreSQL Bulk COPY</text>
                    <rect x="16" y="85" width="173" height="48" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="102" y="105" fill="#38BDF8" font-size="10" font-family="monospace" text-anchor="middle">Chunk: 1,000 / Transaction</text>
                    <text x="102" y="122" fill="#A855F7" font-size="10" font-family="monospace" text-anchor="middle">Polly Jitter Retry (3x)</text>
                    <text x="102" y="158" fill="#E2E8F0" font-size="11" text-anchor="middle">PostGIS / Azure Flexible</text>
                    <text x="102" y="186" fill="#10B981" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">~1 Wk → 3.8 Hours</text>
                  </g>
                </svg>
              } @else if (selectedCaseStudy().diagramType === 'koop-spatial') {
                <!-- Diagram 2: Koop.js + PostGIS ETL Architecture (Unclipped 980x280) -->
                <svg viewBox="0 0 980 280" class="w-full min-w-[880px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
                    </marker>
                  </defs>

                  <!-- Node 1: Scheduled Job -->
                  <g transform="translate(15, 35)">
                    <rect width="195" height="205" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="195" y2="0" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
                    <text x="97" y="32" fill="#38BDF8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">AZURE CONTAINER APPS</text>
                    <text x="97" y="65" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">.NET 8 Scheduled Job</text>
                    <text x="97" y="86" fill="#94A3B8" font-size="11" text-anchor="middle">Cron-driven extraction</text>
                    <rect x="16" y="108" width="163" height="48" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="97" y="129" fill="#F59E0B" font-size="10" font-family="monospace" text-anchor="middle">Polly Transient Retry</text>
                    <text x="97" y="145" fill="#38BDF8" font-size="10" font-family="monospace" text-anchor="middle">Azure Key Vault Secrets</text>
                    <text x="97" y="185" fill="#10B981" font-size="11" font-family="monospace" text-anchor="middle">Resilient Ingestion</text>
                  </g>

                  <!-- Connector 1 -> 2 -->
                  <path d="M 210 137 L 250 137" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow2)" />

                  <!-- Node 2: Blob Staging -->
                  <g transform="translate(255, 35)">
                    <rect width="185" height="205" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="185" y2="0" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
                    <text x="92" y="32" fill="#38BDF8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">AZURE BLOB STORAGE</text>
                    <text x="92" y="65" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">GeoJSON Lake</text>
                    <text x="92" y="86" fill="#94A3B8" font-size="11" text-anchor="middle">Immutable checkpointing</text>
                    <rect x="16" y="108" width="153" height="48" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="92" y="129" fill="#38BDF8" font-size="10" font-family="monospace" text-anchor="middle">Zero Data Loss</text>
                    <text x="92" y="145" fill="#10B981" font-size="10" font-family="monospace" text-anchor="middle">Incremental Deltas</text>
                    <text x="92" y="185" fill="#94A3B8" font-size="11" text-anchor="middle">Decoupled Staging</text>
                  </g>

                  <!-- Connector 2 -> 3 -->
                  <path d="M 440 137 L 480 137" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow2)" />

                  <!-- Node 3: PostgreSQL / PostGIS with GiST -->
                  <g transform="translate(485, 25)">
                    <rect width="235" height="225" rx="10" fill="#0E1726" stroke="#38BDF8" stroke-width="1.8" />
                    <line x1="0" y1="0" x2="235" y2="0" stroke="#10B981" stroke-width="4" stroke-linecap="round" />
                    <text x="117" y="30" fill="#38BDF8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">POSTGIS / AZURE FLEXIBLE</text>
                    <text x="117" y="60" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">Spatial Storage &amp; Indexing</text>
                    <rect x="16" y="80" width="203" height="56" rx="6" fill="#070A11" stroke="#0284C7" />
                    <text x="117" y="102" fill="#38BDF8" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">GiST SPATIAL INDEXING</text>
                    <text x="117" y="122" fill="#10B981" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">ST_Intersects &lt; 120ms</text>
                    <text x="117" y="160" fill="#94A3B8" font-size="10" text-anchor="middle">• ST_SimplifyPreserveTopology</text>
                    <text x="117" y="180" fill="#94A3B8" font-size="10" text-anchor="middle">• County FIPS Table Partitioning</text>
                    <text x="117" y="202" fill="#10B981" font-size="11" font-family="monospace" text-anchor="middle">Zero CPU Lockups</text>
                  </g>

                  <!-- Connector 3 -> 4 -->
                  <path d="M 720 137 L 760 137" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow2)" />

                  <!-- Node 4: Koop.js Feature Server -->
                  <g transform="translate(765, 35)">
                    <rect width="205" height="205" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="205" y2="0" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
                    <text x="102" y="32" fill="#38BDF8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">NODE.JS / KOOP.JS</text>
                    <text x="102" y="65" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">Custom Feature Server</text>
                    <text x="102" y="86" fill="#94A3B8" font-size="11" text-anchor="middle">Esri GeoServices REST API</text>
                    <rect x="16" y="108" width="173" height="48" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="102" y="129" fill="#10B981" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Zero Rate Limits</text>
                    <text x="102" y="145" fill="#F59E0B" font-size="10" font-family="monospace" text-anchor="middle">85% Monthly Cost Saved</text>
                    <text x="102" y="185" fill="#38BDF8" font-size="11" font-family="monospace" text-anchor="middle">Sub-Second Queries</text>
                  </g>
                </svg>
              } @else {
                <!-- Diagram 3: AI Spatial Massing & Feasibility (Unclipped 980x280) -->
                <svg viewBox="0 0 980 280" class="w-full min-w-[880px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="arrow3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#A855F7" />
                    </marker>
                  </defs>

                  <!-- Node 1: 2D Canvas -->
                  <g transform="translate(15, 35)">
                    <rect width="210" height="205" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="210" y2="0" stroke="#A855F7" stroke-width="3" stroke-linecap="round" />
                    <text x="105" y="32" fill="#C084FC" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">ANGULAR + KONVA.JS</text>
                    <text x="105" y="65" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">2D Setback Canvas</text>
                    <text x="105" y="86" fill="#94A3B8" font-size="11" text-anchor="middle">Interactive Lot Dragging</text>
                    <rect x="16" y="108" width="178" height="48" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="105" y="129" fill="#A855F7" font-size="10" font-family="monospace" text-anchor="middle">Sweep-Line Buffer Math</text>
                    <text x="105" y="145" fill="#10B981" font-size="10" font-family="monospace" text-anchor="middle">HTML5 Web Worker</text>
                    <text x="105" y="185" fill="#94A3B8" font-size="11" text-anchor="middle">Unblocked UI Thread</text>
                  </g>

                  <!-- Connector 1 -> 2 -->
                  <path d="M 225 137 L 265 137" stroke="#A855F7" stroke-width="2" marker-end="url(#arrow3)" />

                  <!-- Node 2: 3D Cesium -->
                  <g transform="translate(270, 35)">
                    <rect width="210" height="205" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="210" y2="0" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
                    <text x="105" y="32" fill="#38BDF8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">CESIUM.JS (WEBGL)</text>
                    <text x="105" y="65" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">3D Massing Extrusion</text>
                    <text x="105" y="86" fill="#94A3B8" font-size="11" text-anchor="middle">Volumetric envelopes</text>
                    <rect x="16" y="108" width="178" height="48" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="105" y="129" fill="#38BDF8" font-size="10" font-family="monospace" text-anchor="middle">Dynamic Solar Shadows</text>
                    <text x="105" y="145" fill="#10B981" font-size="10" font-family="monospace" text-anchor="middle">Fluid 60 FPS Engine</text>
                    <text x="105" y="185" fill="#94A3B8" font-size="11" text-anchor="middle">glTF Asset Models</text>
                  </g>

                  <!-- Connector 2 -> 3 -->
                  <path d="M 480 137 L 520 137" stroke="#A855F7" stroke-width="2" marker-end="url(#arrow3)" />

                  <!-- Node 3: AI Feasibility Pipeline -->
                  <g transform="translate(525, 25)">
                    <rect width="240" height="225" rx="10" fill="#0E1726" stroke="#A855F7" stroke-width="1.8" />
                    <line x1="0" y1="0" x2="240" y2="0" stroke="#A855F7" stroke-width="4" stroke-linecap="round" />
                    <text x="120" y="30" fill="#C084FC" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">OPENAI API + JSON SCHEMA</text>
                    <text x="120" y="60" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">AI Zoning Intelligence</text>
                    <rect x="16" y="80" width="208" height="56" rx="6" fill="#070A11" stroke="#9333EA" />
                    <text x="120" y="102" fill="#E9D5FF" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Bylaw Unstructured Parsing</text>
                    <text x="120" y="122" fill="#10B981" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Strict Zero-Hallucination</text>
                    <text x="120" y="160" fill="#94A3B8" font-size="10" text-anchor="middle">• Height, FAR, &amp; Lot Coverage</text>
                    <text x="120" y="180" fill="#94A3B8" font-size="10" text-anchor="middle">• Municipal Constraint Validator</text>
                    <text x="120" y="202" fill="#10B981" font-size="11" font-family="monospace" text-anchor="middle">Pydantic / Zod Schemas</text>
                  </g>

                  <!-- Connector 3 -> 4 -->
                  <path d="M 765 137 L 805 137" stroke="#A855F7" stroke-width="2" marker-end="url(#arrow3)" />

                  <!-- Node 4: Instant Feasibility Dossier -->
                  <g transform="translate(810, 35)">
                    <rect width="160" height="205" rx="10" fill="#111827" stroke="#1E293B" stroke-width="1.5" />
                    <line x1="0" y1="0" x2="160" y2="0" stroke="#10B981" stroke-width="3" stroke-linecap="round" />
                    <text x="80" y="32" fill="#10B981" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">OUTPUT</text>
                    <text x="80" y="65" fill="#F8FAFC" font-size="14" font-weight="bold" text-anchor="middle">Instant Feasibility</text>
                    <rect x="16" y="88" width="128" height="74" rx="6" fill="#070A11" stroke="#1E293B" />
                    <text x="80" y="112" fill="#10B981" font-size="16" font-family="monospace" font-weight="bold" text-anchor="middle">&lt; 4 Sec</text>
                    <text x="80" y="132" fill="#94A3B8" font-size="10" text-anchor="middle">vs. 3-5 Business Days</text>
                    <text x="80" y="148" fill="#38BDF8" font-size="10" text-anchor="middle">Full Risk Assessment</text>
                    <text x="80" y="185" fill="#10B981" font-size="11" font-family="monospace" text-anchor="middle">Automated Dossier</text>
                  </g>
                </svg>
              }
            </div>
          </div>

          <!-- Problem → Hard Decision → What Broke First & Fix Grid -->
          <div class="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Col 1: Problem -->
            <div class="space-y-3">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-900/60">
                <svg class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                01. The Problem
              </div>
              <h4 class="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                The Architectural Bottleneck
              </h4>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                {{ selectedCaseStudy().problem }}
              </p>
            </div>

            <!-- Col 2: Hard Decision -->
            <div class="space-y-3">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-900/60">
                <svg class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                02. Hard Decision
              </div>
              <h4 class="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Engineering Trade-Offs
              </h4>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                {{ selectedCaseStudy().hardDecision }}
              </p>
            </div>

            <!-- Col 3: What Broke First & Fix -->
            <div class="space-y-3">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-900/60">
                <svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                03. What Broke First &amp; Fix
              </div>
              <h4 class="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Debugging Under Real Load
              </h4>
              <div class="p-3.5 rounded-xl bg-slate-100 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#1E293B] text-xs font-mono space-y-2">
                <div class="text-rose-600 dark:text-rose-400">
                  <span class="font-bold uppercase tracking-wider">Broke:</span>
                  {{ selectedCaseStudy().whatBrokeFirstAndFix.broke }}
                </div>
                <div class="text-emerald-700 dark:text-emerald-400 border-t border-slate-200 dark:border-[#1E293B] pt-2">
                  <span class="font-bold uppercase tracking-wider">Fix:</span>
                  {{ selectedCaseStudy().whatBrokeFirstAndFix.fix }}
                </div>
              </div>
              <p class="text-xs font-mono text-[#475569] dark:text-[#94A3B8] pt-1">
                <span class="font-bold text-[#0F172A] dark:text-[#F8FAFC]">Outcome:</span> {{ selectedCaseStudy().whatBrokeFirstAndFix.outcome }}
              </p>
            </div>
          </div>

          <!-- Key Architecture Highlights List -->
          <div class="p-6 sm:p-8 bg-slate-50/70 dark:bg-[#0B0F19]/50 border-t border-[#E2E8F0] dark:border-[#1E293B]">
            <h5 class="text-xs font-mono uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] font-semibold mb-4">
              Core Architectural Highlights
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              @for (item of selectedCaseStudy().architectureHighlights; track item) {
                <div class="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                  <svg class="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ item }}</span>
                </div>
              }
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
})
export class CaseStudiesComponent {
  readonly caseStudies = CASE_STUDIES;
  readonly selectedCaseStudy = signal<CaseStudy>(CASE_STUDIES[0]);
}
