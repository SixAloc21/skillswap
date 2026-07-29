import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { MatchService } from '../../core/services/match.service';
import { Skill } from '../../core/models/skill.model';
import { SkillService } from '../../core/services/skill.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';

@Component({
  selector: 'app-skill-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SkillCardComponent, ModalComponent],
  templateUrl: './skill-detail.component.html',
  styleUrl: './skill-detail.component.scss'
})
export class SkillDetailComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  skill: Skill | undefined;
  relatedSkills: Skill[] = [];
  showRequestModal = false;
  statusMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly skillService: SkillService,
    private readonly matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const skillId = params.get('id') ?? '';
      this.loadSkill(skillId);
    });
  }

  goToDetail(skillId: string): void {
    this.router.navigate(['/habilidad', skillId]);
  }

  openRequestModal(): void {
    this.showRequestModal = true;
  }

  closeRequestModal(): void {
    this.showRequestModal = false;
  }

  confirmRequest(): void {
    if (!this.skill) {
      return;
    }

    const skill = this.skill;

    this.matchService.createRequest(skill).subscribe(() => {
      this.statusMessage = `Solicitud enviada a ${skill.userName}. Revisa Matches para ver su estado.`;
      this.closeRequestModal();
    });
  }

  private loadSkill(skillId: string): void {
    this.skillService
      .getSkillById(skillId)
      .pipe(take(1))
      .subscribe((skill) => {
        this.skill = skill;

        if (!skill) {
          this.relatedSkills = [];
          return;
        }

        this.skillService
          .getSkills()
          .pipe(take(1))
          .subscribe((skills) => {
            this.relatedSkills = skills
              .filter((item) => item.category === skill.category && item.id !== skill.id)
              .slice(0, 3);
          });
      });
  }
}
