import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { CURRENT_USER } from '../data/mock-users';
import { MatchRequest, MatchStatus } from '../models/match-request.model';
import { Skill } from '../models/skill.model';

const MATCHES_API_URL = 'http://localhost:8080/api/matches';
const WEARABLE_API_URL = 'http://localhost:8080/api/wearable/notifications';

type ApiMatchStatus = 'PENDIENTE' | 'ACEPTADO' | 'RECHAZADO' | 'VER_DESPUES';

interface ApiMatch extends Omit<MatchRequest, 'status' | 'requestedAt'> {
  status: ApiMatchStatus;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly http = inject(HttpClient);
  private readonly matchesSubject = new BehaviorSubject<MatchRequest[]>([]);
  readonly matches$ = this.matchesSubject.asObservable();

  getMatches(): Observable<MatchRequest[]> {
    this.refreshMatches();
    return this.matches$;
  }

  getPendingCount(): Observable<number> {
    return this.getMatches().pipe(map((matches) => matches.filter((match) => match.status === 'Pendiente').length));
  }

  createRequest(skill: Skill): Observable<MatchRequest> {
    const request = {
      requesterName: CURRENT_USER.name,
      requesterHeadline: CURRENT_USER.headline,
      ownerName: skill.userName,
      offeredSkill: CURRENT_USER.featuredOffer,
      desiredSkill: skill.title,
      modality: skill.modality,
      availability: skill.availability,
      message: `Me interesa intercambiar ${CURRENT_USER.featuredOffer} por tu habilidad "${skill.title}".`
    };

    return this.http.post<ApiMatch>(MATCHES_API_URL, request).pipe(
      map((match) => this.fromApiMatch(match)),
      tap((match) => this.matchesSubject.next([match, ...this.matchesSubject.value]))
    );
  }

  acceptRequest(id: string): Observable<MatchRequest> {
    return this.updateStatus(id, 'accept');
  }

  rejectRequest(id: string): Observable<MatchRequest> {
    return this.updateStatus(id, 'reject');
  }

  markForLater(id: string): Observable<MatchRequest> {
    return this.updateStatus(id, 'later');
  }

  getWearableNotifications(): Observable<MatchRequest[]> {
    return this.http.get<ApiMatch[]>(WEARABLE_API_URL).pipe(
      map((matches) => matches.map((match) => this.fromApiMatch(match))),
      catchError(() => of([]))
    );
  }

  updateWearableNotification(id: string, action: 'accept' | 'reject' | 'later'): Observable<MatchRequest> {
    return this.http.patch<ApiMatch>(`${WEARABLE_API_URL}/${id}/${action}`, {}).pipe(
      map((match) => this.fromApiMatch(match)),
      tap((match) => this.patchLocalMatch(match))
    );
  }

  private updateStatus(id: string, action: 'accept' | 'reject' | 'later'): Observable<MatchRequest> {
    return this.http.patch<ApiMatch>(`${MATCHES_API_URL}/${id}/${action}`, {}).pipe(
      map((match) => this.fromApiMatch(match)),
      tap((match) => this.patchLocalMatch(match))
    );
  }

  private refreshMatches(): void {
    this.http.get<ApiMatch[]>(MATCHES_API_URL).pipe(
      map((matches) => matches.map((match) => this.fromApiMatch(match))),
      catchError(() => of(this.matchesSubject.value))
    ).subscribe((matches) => this.matchesSubject.next(matches));
  }

  private patchLocalMatch(updatedMatch: MatchRequest): void {
    const existingMatches = this.matchesSubject.value;
    const matchExists = existingMatches.some((match) => match.id === updatedMatch.id);
    const matches = matchExists
      ? existingMatches.map((match) => (match.id === updatedMatch.id ? updatedMatch : match))
      : [updatedMatch, ...existingMatches];

    this.matchesSubject.next(matches);
  }

  private fromApiMatch(match: ApiMatch): MatchRequest {
    return {
      id: match.id,
      requesterName: match.requesterName,
      requesterHeadline: match.requesterHeadline,
      ownerName: match.ownerName,
      offeredSkill: match.offeredSkill,
      desiredSkill: match.desiredSkill,
      modality: match.modality,
      availability: match.availability,
      requestedAt: this.formatRelativeDate(match.createdAt),
      message: match.message,
      status: this.fromApiStatus(match.status)
    };
  }

  private fromApiStatus(status: ApiMatchStatus): MatchStatus {
    const statuses: Record<ApiMatchStatus, MatchStatus> = {
      PENDIENTE: 'Pendiente',
      ACEPTADO: 'Aceptado',
      RECHAZADO: 'Rechazado',
      VER_DESPUES: 'Ver despues'
    };

    return statuses[status];
  }

  private formatRelativeDate(value: string): string {
    const createdAt = new Date(value).getTime();
    const elapsedMinutes = Math.max(1, Math.round((Date.now() - createdAt) / 60000));

    if (elapsedMinutes < 60) {
      return `Hace ${elapsedMinutes} min`;
    }

    const elapsedHours = Math.round(elapsedMinutes / 60);
    return `Hace ${elapsedHours} h`;
  }
}
