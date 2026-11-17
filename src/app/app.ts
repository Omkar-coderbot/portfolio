import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from './shared/components/nav-header/nav-header.component';
import { HeroComponent } from './features/hero/hero.component';
import { CaseStudiesComponent } from './features/case-studies/case-studies.component';
import { TechStackComponent } from './features/tech-stack/tech-stack.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AiAssistantComponent } from './features/ai-assistant/ai-assistant.component';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavHeaderComponent,
    HeroComponent,
    CaseStudiesComponent,
    TechStackComponent,
    ExperienceComponent,
    FooterComponent,
    AiAssistantComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly toastService = inject(ToastService);
}
