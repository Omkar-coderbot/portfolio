import { Injectable, signal } from '@angular/core';

export interface ToastNotification {
  message: string;
  type: 'success' | 'info' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly currentToast = signal<ToastNotification | null>(null);
  private timer: any = null;

  show(message: string, type: 'success' | 'info' | 'error' = 'success'): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.currentToast.set({ message, type });
    this.timer = setTimeout(() => {
      this.currentToast.set(null);
    }, 3200);
  }

  dismiss(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.currentToast.set(null);
  }
}
