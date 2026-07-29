export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse extends ContactRequest {
  id: string;
  createdAt: string;
}
