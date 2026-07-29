import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { MatchService } from '../../core/services/match.service';
import { Skill } from '../../core/models/skill.model';
import { SkillService } from '../../core/services/skill.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PromoBannerComponent } from '../../shared/components/promo-banner/promo-banner.component';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PromoBannerComponent, SkillCardComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly skillService = inject(SkillService);
  private readonly matchService = inject(MatchService);

  readonly featuredSkills$ = this.skillService.getFeaturedSkills(4);
  readonly categorySummaries$ = this.skillService.getCategorySummaries(6);
  readonly stats$ = combineLatest([
    this.skillService.getSkills(),
    this.skillService.getCategorySummaries(20),
    this.matchService.getPendingCount()
  ]).pipe(
    map(([skills, categories, pending]) => [
      { value: skills.length, label: 'habilidades activas' },
      { value: categories.length, label: 'categorias disponibles' },
      { value: pending, label: 'matches pendientes' }
    ])
  );

  selectedSkill: Skill | null = null;
  showRequestModal = false;
  showWelcomeModal = true;
  statusMessage = '';

  goToDetail(skillId: string): void {
    this.router.navigate(['/habilidad', skillId]);
  }

  openCategory(category: string): void {
    this.router.navigate(['/explorar'], { queryParams: { categoria: category } });
  }

  openRequestModal(skill: Skill): void {
    this.selectedSkill = skill;
    this.showRequestModal = true;
  }

  closeRequestModal(): void {
    this.showRequestModal = false;
    this.selectedSkill = null;
  }

  confirmRequest(): void {
    if (!this.selectedSkill) {
      return;
    }

    const skill = this.selectedSkill;

    this.matchService.createRequest(skill).subscribe(() => {
      this.statusMessage = `Tu solicitud para intercambiar con ${skill.userName} ya quedo registrada en Matches.`;
      this.closeRequestModal();
    });
  }

  closeWelcomeModal(): void {
    this.showWelcomeModal = false;
  }

  startExploring(): void {
    this.closeWelcomeModal();
    this.router.navigate(['/explorar']);
  }
}
