import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { CURRENT_USER } from '../../core/data/mock-users';
import { MatchService } from '../../core/services/match.service';
import { SkillService } from '../../core/services/skill.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private readonly skillService = inject(SkillService);
  private readonly matchService = inject(MatchService);

  readonly vm$ = combineLatest([
    this.skillService.getUserSkills(CURRENT_USER.name),
    this.matchService.getPendingCount()
  ]).pipe(
    map(([publishedSkills, pendingRequests]) => ({
      user: CURRENT_USER,
      publishedSkills,
      pendingRequests
    }))
  );

}
