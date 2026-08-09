import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Skill } from '../models/skill.model';
import { SkillService } from './skill.service';

describe('SkillService search fallback', () => {
  let service: SkillService;

  const skills: Skill[] = [
    {
      id: 'photo',
      title: 'Fotografia con celular',
      category: 'Fotografia',
      description: 'Iluminacion y encuadre',
      fullDescription: 'Curso practico de fotografia movil',
      level: 'Intermedio',
      modality: 'Online',
      exchangeFor: 'Ingles',
      availability: 'Sabado',
      userId: 'user-ana',
      userName: 'Ana',
      userHeadline: 'Fotografa',
      location: 'Puebla'
    },
    {
      id: 'english',
      title: 'Ingles conversacional',
      category: 'Idiomas',
      description: 'Practica para entrevistas',
      fullDescription: 'Conversacion y vocabulario profesional',
      level: 'Basico',
      modality: 'Presencial',
      exchangeFor: 'Fotografia',
      availability: 'Viernes',
      userId: 'user-luis',
      userName: 'Luis',
      userHeadline: 'Docente',
      location: 'Queretaro'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(SkillService);
  });

  it('finds content by text without leaving the site', () => {
    const result = service.filterSkills(skills, {
      query: 'fotografia',
      category: '',
      modality: '',
      level: ''
    });

    expect(result.map((skill) => skill.id)).toEqual(['photo']);
  });

  it('combines category, modality and level filters', () => {
    const result = service.filterSkills(skills, {
      query: '',
      category: 'Idiomas',
      modality: 'Presencial',
      level: 'Basico'
    });

    expect(result.map((skill) => skill.id)).toEqual(['english']);
  });

  it('returns an empty collection when nothing matches', () => {
    const result = service.filterSkills(skills, {
      query: 'astrofisica marina',
      category: '',
      modality: '',
      level: ''
    });

    expect(result).toEqual([]);
  });
});
