import { User } from '../models/user.model';

export const CURRENT_USER: User = {
  id: 'user-maria-torres',
  name: 'Maria Torres',
  headline: 'Disenadora UX y mentora de portafolios',
  location: 'Ciudad de Mexico',
  about:
    'Maria participa en comunidades de aprendizaje colaborativo y usa SkillSwap para intercambiar sesiones practicas, retroalimentacion y acompanamiento para proyectos.',
  avatarInitials: 'MT',
  avatarGradient: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
  featuredOffer: 'Mentoria de UX con Figma',
  skillsToLearn: ['Fotografia de producto', 'Ingles conversacional', 'Meal prep saludable'],
  stats: {
    completedSwaps: 18,
    pendingRequests: 4,
    rating: 4.9
  }
};
