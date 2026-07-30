import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { CategorySummary, Skill, SkillSearchFilters, SkillSuggestion } from '../models/skill.model';

const API_URL = 'http://localhost:8080/api/skills';

type ApiSkillLevel = 'BASICO' | 'INTERMEDIO' | 'AVANZADO';
type ApiSkillModality = 'ONLINE' | 'PRESENCIAL' | 'HIBRIDO';

interface ApiSkill extends Omit<Skill, 'level' | 'modality' | 'userId'> {
  level: ApiSkillLevel;
  modality: ApiSkillModality;
}

export interface NewSkillPayload {
  title: string;
  category: string;
  description: string;
  level: Skill['level'];
  modality: Skill['modality'];
  exchangeFor: string;
  availability: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private readonly http = inject(HttpClient);
  private readonly skillsSubject = new BehaviorSubject<Skill[]>([]);
  private readonly categoryDescriptions: Record<string, string> = {
    Tecnologia: 'Herramientas digitales, programacion y producto.',
    Idiomas: 'Conversacion, gramatica y expresion.',
    Arte: 'Creatividad visual y exploracion estetica.',
    Musica: 'Instrumentos, voz y presencia escenica.',
    Fitness: 'Bienestar, energia y movimiento.',
    Cocina: 'Habitos practicos para el dia a dia.',
    Fotografia: 'Captura, composicion y edicion.',
    Matematicas: 'Refuerzo academico y resolucion de problemas.'
  };

  readonly skills$ = this.skillsSubject.asObservable();

  getSkills(): Observable<Skill[]> {
    return this.http.get<ApiSkill[]>(API_URL).pipe(
      map((skills) => skills.map((skill) => this.fromApiSkill(skill))),
      tap((skills) => this.skillsSubject.next(skills)),
      catchError(() => of(this.skillsSubject.value))
    );
  }

  getCurrentSkills(): Skill[] {
    return this.skillsSubject.value;
  }

  getSkillById(id: string): Observable<Skill | undefined> {
    return this.http.get<ApiSkill>(`${API_URL}/${id}`).pipe(
      map((skill) => this.fromApiSkill(skill)),
      catchError(() => of(this.skillsSubject.value.find((skill) => skill.id === id)))
    );
  }

  getFeaturedSkills(limit = 4): Observable<Skill[]> {
    return this.getSkills().pipe(map((skills) => skills.filter((skill) => skill.featured).slice(0, limit)));
  }

  getUserSkills(userName: string): Observable<Skill[]> {
    return this.getSkills().pipe(map((skills) => skills.filter((skill) => skill.userName === userName)));
  }

  getCategorySummaries(limit = 6): Observable<CategorySummary[]> {
    return this.getSkills().pipe(
      map((skills) => {
        const counts = skills.reduce<Record<string, number>>((accumulator, skill) => {
          accumulator[skill.category] = (accumulator[skill.category] ?? 0) + 1;
          return accumulator;
        }, {});

        return Object.entries(counts)
          .map(([name, count], index) => ({
            name,
            count,
            description: this.categoryDescriptions[name] ?? 'Comunidad lista para intercambiar y aprender.',
            accent: this.getAccentByIndex(index)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, limit);
      })
    );
  }

  searchSkills(filters: SkillSearchFilters): Observable<Skill[]> {
    let params = new HttpParams();

    if (filters.query.trim()) {
      params = params.set('q', filters.query.trim());
    }

    if (filters.category) {
      params = params.set('category', filters.category);
    }

    if (filters.modality) {
      params = params.set('modality', this.toApiModality(filters.modality));
    }

    if (filters.level) {
      params = params.set('level', this.toApiLevel(filters.level));
    }

    return this.http.get<ApiSkill[]>(`${API_URL}/search`, { params }).pipe(
      map((skills) => skills.map((skill) => this.fromApiSkill(skill))),
      catchError(() => of(this.filterSkills(this.skillsSubject.value, filters)))
    );
  }

  getSuggestions(query: string): Observable<SkillSuggestion[]> {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      return of([]);
    }

    const params = new HttpParams().set('q', trimmedQuery);
    return this.http.get<SkillSuggestion[]>(`${API_URL}/suggestions`, { params }).pipe(catchError(() => of([])));
  }

  filterSkills(skills: Skill[], filters: SkillSearchFilters): Skill[] {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesQuery =
        !normalizedQuery ||
        skill.title.toLowerCase().includes(normalizedQuery) ||
        skill.description.toLowerCase().includes(normalizedQuery) ||
        skill.fullDescription.toLowerCase().includes(normalizedQuery);

      const matchesCategory = !filters.category || skill.category === filters.category;
      const matchesModality = !filters.modality || skill.modality === filters.modality;
      const matchesLevel = !filters.level || skill.level === filters.level;

      return matchesQuery && matchesCategory && matchesModality && matchesLevel;
    });
  }

  addSkill(payload: NewSkillPayload): Observable<Skill> {
    const request = {
      ...payload,
      level: this.toApiLevel(payload.level),
      modality: this.toApiModality(payload.modality)
    };

    return this.http.post<ApiSkill>(API_URL, request).pipe(
      map((skill) => this.fromApiSkill(skill)),
      tap((skill) => this.skillsSubject.next([skill, ...this.skillsSubject.value]))
    );
  }

  private fromApiSkill(skill: ApiSkill): Skill {
    return {
      ...skill,
      level: this.fromApiLevel(skill.level),
      modality: this.fromApiModality(skill.modality),
      userId: `user-${skill.userName.toLowerCase().replace(/\s+/g, '-')}`
    };
  }

  private toApiLevel(level: Skill['level']): ApiSkillLevel {
    const levels: Record<Skill['level'], ApiSkillLevel> = {
      Basico: 'BASICO',
      Intermedio: 'INTERMEDIO',
      Avanzado: 'AVANZADO'
    };

    return levels[level];
  }

  private fromApiLevel(level: ApiSkillLevel): Skill['level'] {
    const levels: Record<ApiSkillLevel, Skill['level']> = {
      BASICO: 'Basico',
      INTERMEDIO: 'Intermedio',
      AVANZADO: 'Avanzado'
    };

    return levels[level];
  }

  private toApiModality(modality: Skill['modality']): ApiSkillModality {
    const modalities: Record<Skill['modality'], ApiSkillModality> = {
      Online: 'ONLINE',
      Presencial: 'PRESENCIAL',
      Hibrido: 'HIBRIDO'
    };

    return modalities[modality];
  }

  private fromApiModality(modality: ApiSkillModality): Skill['modality'] {
    const modalities: Record<ApiSkillModality, Skill['modality']> = {
      ONLINE: 'Online',
      PRESENCIAL: 'Presencial',
      HIBRIDO: 'Hibrido'
    };

    return modalities[modality];
  }

  private getAccentByIndex(index: number): string {
    const accents = ['blue', 'violet', 'emerald', 'amber', 'rose', 'cyan'];
    return accents[index % accents.length];
  }
}
