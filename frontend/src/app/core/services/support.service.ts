import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SupportConversation {
  id: number;
  nombreUsuario: string;
  estado: string;
  fechaCreacion: string;
  ultimaActualizacion: string;
}

export interface SupportMessage {
  id: number;
  conversationId: number;
  emisor: string;
  mensaje: string;
  fechaEnvio: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupportService {

  private apiUrl =
    'https://skillswap-api-e7y8.onrender.com/api/support';

  constructor(
    private http: HttpClient
  ) {}

  obtenerConversaciones():
    Observable<SupportConversation[]> {

    return this.http.get<
      SupportConversation[]
    >(
      `${this.apiUrl}/conversations`
    );
  }

  obtenerMensajes(
    conversationId: number
  ): Observable<SupportMessage[]> {

    return this.http.get<
      SupportMessage[]
    >(
      `${this.apiUrl}/conversations/${conversationId}/messages`
    );
  }

  enviarMensaje(
    conversationId: number,
    mensaje: string
  ): Observable<SupportMessage> {

    return this.http.post<
      SupportMessage
    >(
      `${this.apiUrl}/conversations/${conversationId}/messages`,
      {
        emisor: 'ADMIN',
        mensaje: mensaje,
      }
    );
  }

  cerrarConversacion(
    conversationId: number
  ): Observable<SupportConversation> {

    return this.http.put<
      SupportConversation
    >(
      `${this.apiUrl}/conversations/${conversationId}/close`,
      {}
    );
  }
}