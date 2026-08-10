import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { SkillService } from './skill.service';

describe('SkillService Elasticsearch search', () => {
  let service: SkillService;
  let httpTesting: HttpTestingController;

  const apiSkill = {
    id: 'photo',
    title: 'Fotografia con celular',
    category: 'Fotografia',
    description: 'Iluminacion y encuadre',
    fullDescription: 'Curso practico de fotografia movil',
    level: 'INTERMEDIO',
    modality: 'ONLINE',
    exchangeFor: 'Ingles',
    availability: 'Sabado',
    userName: 'Ana',
    userHeadline: 'Fotografa',
    location: 'Puebla',
    featured: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(SkillService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('sends text searches to the backend Elasticsearch endpoint', () => {
    service
      .searchSkills({ query: 'fotografia', category: '', modality: '', level: '' })
      .subscribe((skills) => expect(skills.map((skill) => skill.id)).toEqual(['photo']));

    const request = httpTesting.expectOne(
      (candidate) => candidate.url === `${environment.apiBaseUrl}/api/skills/search`
    );
    expect(request.request.params.get('q')).toBe('fotografia');
    request.flush([apiSkill]);
  });

  it('sends category, modality and level filters to Elasticsearch', () => {
    service
      .searchSkills({ query: '', category: 'Fotografia', modality: 'Online', level: 'Intermedio' })
      .subscribe((skills) => expect(skills.length).toBe(1));

    const request = httpTesting.expectOne(
      (candidate) => candidate.url === `${environment.apiBaseUrl}/api/skills/search`
    );
    expect(request.request.params.get('category')).toBe('Fotografia');
    expect(request.request.params.get('modality')).toBe('ONLINE');
    expect(request.request.params.get('level')).toBe('INTERMEDIO');
    request.flush([apiSkill]);
  });

  it('keeps an empty Elasticsearch result empty', () => {
    service
      .searchSkills({ query: 'astrofisica marina', category: '', modality: '', level: '' })
      .subscribe((skills) => expect(skills).toEqual([]));

    const request = httpTesting.expectOne(
      (candidate) => candidate.url === `${environment.apiBaseUrl}/api/skills/search`
    );
    request.flush([]);
  });
});
