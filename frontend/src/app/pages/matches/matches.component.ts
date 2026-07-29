import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatchRequest } from '../../core/models/match-request.model';
import { MatchService } from '../../core/services/match.service';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent {
  private readonly matchService = inject(MatchService);

  readonly vm$ = this.matchService.getMatches().pipe(
    map((matches) => ({
      matches,
      pending: matches.filter((match) => match.status === 'Pendiente').length,
      accepted: matches.filter((match) => match.status === 'Aceptado').length,
      rejected: matches.filter((match) => match.status === 'Rechazado').length
    }))
  );

  acceptRequest(matchId: string): void {
    this.matchService.acceptRequest(matchId).subscribe();
  }

  rejectRequest(matchId: string): void {
    this.matchService.rejectRequest(matchId).subscribe();
  }

  getStatusClass(status: MatchRequest['status']): string {
    return {
      Pendiente: 'badge badge--pending',
      Aceptado: 'badge badge--accepted',
      Rechazado: 'badge badge--rejected',
      'Ver despues': 'badge badge--later'
    }[status];
  }
}
