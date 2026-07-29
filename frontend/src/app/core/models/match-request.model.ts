export type MatchStatus = 'Pendiente' | 'Aceptado' | 'Rechazado' | 'Ver despues';

export interface MatchRequest {
  id: string;
  requesterName: string;
  requesterHeadline: string;
  ownerName: string;
  offeredSkill: string;
  desiredSkill: string;
  modality: string;
  availability: string;
  requestedAt: string;
  message: string;
  status: MatchStatus;
}
