import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Session {
  id?: number;
  nombre: string;
  descripcion: string;
  instructor: string;
  fecha: string;
  hora: string;
  cupo: number;
  cupoTotal?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl =
    'https://skillswap-api-e7y8.onrender.com/api/sessions';

  constructor(
    private http: HttpClient
  ) {}

  crearSesion(
    session: Session
  ): Observable<Session> {

    return this.http.post<Session>(
      this.apiUrl,
      session
    );
  }

  obtenerSesiones(): Observable<Session[]> {

    return this.http.get<Session[]>(
      this.apiUrl
    );
  }

  obtenerSesionPorId(
    id: number
  ): Observable<Session> {

    return this.http.get<Session>(
      `${this.apiUrl}/${id}`
    );
  }
}