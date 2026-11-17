import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  // Engineering-first dark mode is the default
  readonly isDark = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('omkar_portfolio_theme');
      if (savedTheme) {
        this.isDark.set(savedTheme === 'dark');
      } else {
        // Default to dark mode as requested
        this.isDark.set(true);
      }

      effect(() => {
        const dark = this.isDark();
        const root = document.documentElement;
        if (dark) {
          root.classList.add('dark');
          localStorage.setItem('omkar_portfolio_theme', 'dark');
        } else {
          root.classList.remove('dark');
          localStorage.setItem('omkar_portfolio_theme', 'light');
        }
      });
    }
  }

  toggleTheme(): void {
    this.isDark.update((v) => !v);
  }
}
