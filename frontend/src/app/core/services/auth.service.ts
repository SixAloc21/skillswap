import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminLoginRequest {
  usuario: string;
  password: string;
}

export interface AdminLoginResponse {
  acceso: boolean;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'https://skillswap-api-e7y8.onrender.com/api/admin/login';

  constructor(
    private http: HttpClient
  ) {}

  login(
    datos: AdminLoginRequest
  ): Observable<AdminLoginResponse> {

    return this.http.post<AdminLoginResponse>(
      this.apiUrl,
      datos
    );
  }

  guardarSesion(): void {
    localStorage.setItem(
      'adminAutenticado',
      'true'
    );
  }

  cerrarSesion(): void {
    localStorage.removeItem(
      'adminAutenticado'
    );
  }

  estaAutenticado(): boolean {
    return localStorage.getItem(
      'adminAutenticado'
    ) === 'true';
  }
}