import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Registration {
  id?: number;
  sessionId: number;
  nombreUsuario: string;
  fechaRegistro: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl =
    'https://skillswap-api-e7y8.onrender.com/api/registrations';

  constructor(
    private http: HttpClient
  ) {}

  obtenerPorSesion(
    sessionId: number
  ): Observable<Registration[]> {

    return this.http.get<Registration[]>(
      `${this.apiUrl}/session/${sessionId}`
    );
  }
}