import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../core/data/portfolio-data';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative pt-14 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-[#FAF9F6] dark:bg-[#0B0F19] transition-colors duration-200">
      <!-- Topographic Contour SVG Overlay (Dual Theme: Cobalt Blue in Light, Electric Cyan in Dark) -->
      <div class="absolute -right-20 -top-20 w-[640px] h-[640px] pointer-events-none opacity-[0.05] dark:opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] select-none">
        <svg viewBox="0 0 600 600" class="w-full h-full stroke-blue-700 dark:stroke-sky-400" fill="none" stroke-width="1.5">
          <ellipse cx="300" cy="300" rx="270" ry="240" />
          <path d="M40,300 C80,180 180,100 300,100 C420,100 520,180 560,300 C520,420 420,500 300,500 C180,500 80,420 40,300 Z" />
          <path d="M80,300 C120,200 200,140 300,140 C400,140 480,200 520,300 C480,400 400,460 300,460 C200,460 120,400 80,300 Z" />
          <path d="M120,300 C150,220 220,180 300,180 C380,180 450,220 480,300 C450,380 380,420 300,420 C220,420 150,380 120,300 Z" />
          <path d="M160,300 C180,240 240,220 300,220 C360,220 420,240 440,300 C420,360 360,380 300,380 C240,380 180,360 160,300 Z" />
          <path d="M200,300 C220,260 260,250 300,250 C340,250 380,260 400,300 C380,340 340,350 300,350 C260,350 220,340 200,300 Z" />
          <circle cx="300" cy="300" r="30" />
        </svg>
      </div>

      <!-- Subtle Cartesian Grid -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#0F172A0A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A0A_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1E293B0F_1px,transparent_1px),linear-gradient(to_bottom,#1E293B0F_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Live Telemetry Status Pill -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E2E8F0] dark:border-[#1E293B] bg-white/80 dark:bg-[#111827]/80 text-xs font-mono text-[#475569] dark:text-[#94A3B8] backdrop-blur-sm mb-6 shadow-xs">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
          <span class="text-[#0F172A] dark:text-[#F8FAFC]">Spatial Telemetry Online</span>
          <span class="text-[#CBD5E1] dark:text-[#334155]">•</span>
          <span>Pune, India</span>
        </div>

        <!-- Headline & Impact Positioning -->
        <div class="max-w-4xl">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-[1.1]">
            Omkar Marwadi, Senior Full-Stack &amp; Geospatial Cloud Architect
          </h1>

          <p class="mt-5 text-lg sm:text-xl text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
            Architecting high-throughput distributed backend pipelines and geospatial platforms for LA County scale.
          </p>
        </div>

        <!-- Hero CTA Buttons -->
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <!-- Solid Primary CTA -->
          <a
            href="#case-studies"
            class="px-6 py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-blue-500/20 dark:hover:shadow-sky-500/20">
            <span>Explore Case Studies</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>

          <!-- Outline Secondary CTA -->
          <button
            type="button"
            (click)="downloadResume()"
            class="px-5 py-3 rounded-lg text-sm font-semibold border border-blue-600/40 dark:border-sky-500/40 bg-blue-50/50 dark:bg-sky-500/5 hover:bg-blue-100/60 dark:hover:bg-sky-500/10 text-blue-700 dark:text-sky-400 transition-all flex items-center gap-2 cursor-pointer shadow-xs">
            <svg class="w-4 h-4 text-blue-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Resume (PDF)</span>
          </button>
        </div>

        <!-- Telemetry Metrics Strip (Dual-Theme Sparklines & JetBrains Mono Numbers) -->
        <div class="mt-14 pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <!-- Metric 1: 2M+ Parcels Processed -->
          <div class="p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-[#334155] transition-colors flex items-center justify-between gap-4 shadow-xs">
            <div>
              <div class="text-3xl font-mono font-bold tracking-tight text-blue-700 dark:text-sky-400">
                2M+
              </div>
              <div class="mt-1 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Parcels Processed
              </div>
              <div class="mt-0.5 text-[11px] text-[#475569] dark:text-[#94A3B8]">
                25+ spatial &amp; zoning rules
              </div>
            </div>
            <!-- 5-bar ascending SVG bar chart -->
            <div class="shrink-0">
              <svg class="w-9 h-9 text-blue-600 dark:text-sky-400" viewBox="0 0 32 32" fill="currentColor">
                <rect x="2" y="22" width="4.5" height="7" rx="1" opacity="0.3" />
                <rect x="8.5" y="17" width="4.5" height="12" rx="1" opacity="0.45" />
                <rect x="15" y="12" width="4.5" height="17" rx="1" opacity="0.65" />
                <rect x="21.5" y="7" width="4.5" height="22" rx="1" opacity="0.85" />
                <rect x="28" y="3" width="4" height="26" rx="1" />
              </svg>
            </div>
          </div>

          <!-- Metric 2: ~1 Wk -> Hours Runtime -->
          <div class="p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-[#334155] transition-colors flex items-center justify-between gap-4 shadow-xs">
            <div>
              <div class="text-2xl font-mono font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
                ~1 Wk → Hrs
              </div>
              <div class="mt-1 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Hours Runtime
              </div>
              <div class="mt-0.5 text-[11px] text-[#475569] dark:text-[#94A3B8]">
                Sub-hour TPL pipeline
              </div>
            </div>
            <!-- 6-step ascending emerald staircase sparkline -->
            <div class="shrink-0">
              <svg class="w-9 h-9 text-emerald-600 dark:text-emerald-400" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 24 L8 24 L8 19 L14 19 L14 14 L20 14 L20 9 L26 9 L26 4 L29 4" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="29" cy="4" r="2.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          <!-- Metric 3: <120ms Spatial Query Latency -->
          <div class="p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-[#334155] transition-colors flex items-center justify-between gap-4 shadow-xs">
            <div>
              <div class="text-3xl font-mono font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                &lt;120ms
              </div>
              <div class="mt-1 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Spatial Query Latency
              </div>
              <div class="mt-0.5 text-[11px] text-[#475569] dark:text-[#94A3B8]">
                PostGIS GiST indexing
              </div>
            </div>
            <!-- Pulse / waveform SVG icon -->
            <div class="shrink-0">
              <svg class="w-9 h-9 text-emerald-600 dark:text-emerald-400" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 16h6l3-9 5 18 3-11 2 5 2-3h7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <!-- Metric 4: 99.9% Pipeline Reliability -->
          <div class="p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-[#334155] transition-colors flex items-center justify-between gap-4 shadow-xs">
            <div>
              <div class="text-3xl font-mono font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
                99.9%
              </div>
              <div class="mt-1 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Pipeline Reliability
              </div>
              <div class="mt-0.5 text-[11px] text-[#475569] dark:text-[#94A3B8]">
                Polly resilience &amp; backpressure
              </div>
            </div>
            <!-- Shield-check SVG icon -->
            <div class="shrink-0">
              <svg class="w-9 h-9 text-blue-600 dark:text-sky-400" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4l10 4v7c0 7-5 11.5-10 13-5-1.5-10-6-10-13V8l10-4z" />
                <path d="M11 16l3.5 3.5 7-7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  readonly profile = PROFILE_DATA;
  readonly toastService = inject(ToastService);

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
