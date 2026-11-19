import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../../core/data/portfolio-data';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="border-t border-[#E8E5DF] dark:border-[#1C2436] py-12 text-xs font-mono text-stone-500 dark:text-slate-400 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <!-- Left: Monogram and Identity -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xs bg-white dark:bg-[#0E1320] border border-[#E8E5DF] dark:border-[#1C2436] text-stone-900 dark:text-slate-100 font-display font-bold flex items-center justify-center text-xs shadow-2xs">
              OM
            </div>
            <div>
              <div class="font-display font-bold text-base text-stone-900 dark:text-white uppercase tracking-wide">
                {{ profile.name }}
              </div>
              <div class="text-[11px] text-stone-500 dark:text-slate-400 font-mono mt-0.5">
                {{ profile.title }} • {{ profile.company }} • {{ profile.location }}
              </div>
            </div>
          </div>

          <!-- Right: Direct Profile Links & Placeholders -->
          <div class="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
            <a
              [href]="'mailto:' + profile.email"
              class="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
              {{ profile.email }}
            </a>
            <a
              [href]="'tel:' + profile.phone"
              class="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
              {{ profile.phone }}
            </a>
            <a
              [href]="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
              GitHub ↗
            </a>
            <a
              [href]="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
              LinkedIn ↗
            </a>
            <a
              [href]="profile.resumeUrl"
              download="Omkar_Marwadi_Resume.pdf"
              (click)="onDownloadClick()"
              class="tag-accent-clean font-semibold">
              Resume (PDF)
            </a>
          </div>
        </div>

        <!-- Bottom Notice -->
        <div class="mt-8 pt-6 border-t border-[#E8E5DF] dark:border-[#1C2436] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400 dark:text-slate-500 font-mono">
          <div>
            Built with Angular 17 (Standalone Components, Signals, &#64;for/&#64;if) &amp; Tailwind CSS.
          </div>
          <div class="text-stone-500 dark:text-slate-400 uppercase tracking-wider">
            Pune, India • Neilsoft Ltd.
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly profile = PROFILE_DATA;
  readonly toastService = inject(ToastService);

  onDownloadClick(): void {
    this.toastService.show('Downloading Omkar Marwadi Resume (PDF)...', 'success');
  }
}
