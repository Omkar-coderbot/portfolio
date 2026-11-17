import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../../core/data/portfolio-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#FAF9F6] dark:bg-[#0B0F19] py-12 text-xs font-mono text-[#475569] dark:text-[#94A3B8] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] text-blue-700 dark:text-sky-400 font-bold flex items-center justify-center text-[10px] shadow-xs">
              OM
            </div>
            <span class="text-[#0F172A] dark:text-[#F8FAFC]">Omkar Marwadi • Senior Full-Stack &amp; Geospatial Cloud Architect</span>
          </div>

          <div class="flex items-center gap-6">
            <a
              [href]="'mailto:' + profile.email"
              class="hover:text-blue-700 dark:hover:text-sky-400 transition-colors">
              {{ profile.email }}
            </a>
            <a
              [href]="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-blue-700 dark:hover:text-sky-400 transition-colors">
              GitHub
            </a>
            <a
              [href]="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-blue-700 dark:hover:text-sky-400 transition-colors">
              LinkedIn
            </a>
            <span class="text-[#64748B]">Pune, India</span>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B]">
          <div>
            Built with Angular Standalone Components + Signals, Tailwind CSS, &amp; Cloudflare Workers AI.
          </div>
          <div class="text-blue-700 dark:text-sky-400/80">
            Spatial Telemetry (Dark) &amp; Technical Blueprint (Light)
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly profile = PROFILE_DATA;
}
