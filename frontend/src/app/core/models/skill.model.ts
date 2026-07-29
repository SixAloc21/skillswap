export type SkillLevel = 'Basico' | 'Intermedio' | 'Avanzado';
export type SkillModality = 'Online' | 'Presencial' | 'Hibrido';

export interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  level: SkillLevel;
  modality: SkillModality;
  exchangeFor: string;
  availability: string;
  userId: string;
  userName: string;
  userHeadline: string;
  location: string;
  featured?: boolean;
}

export interface SkillSearchFilters {
  query: string;
  category: string;
  modality: '' | SkillModality;
  level: '' | SkillLevel;
}

export interface CategorySummary {
  name: string;
  count: number;
  description: string;
  accent: string;
}
