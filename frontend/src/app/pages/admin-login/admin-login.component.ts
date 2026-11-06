import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthService
} from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './admin-login.component.html',
  styleUrl:
    './admin-login.component.scss'
})
export class AdminLoginComponent {

  usuario = '';
  password = '';

  cargando = false;
  errorMensaje = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion(): void {

    this.errorMensaje = '';

    if (
      !this.usuario.trim() ||
      !this.password
    ) {
      this.errorMensaje =
        'Ingresa usuario y contraseña.';

      return;
    }

    this.cargando = true;

    this.authService.login({
      usuario: this.usuario.trim(),
      password: this.password
    })
    .subscribe({

      next: (respuesta) => {

        this.cargando = false;

        if (!respuesta.acceso) {
          this.errorMensaje =
            respuesta.mensaje;

          return;
        }

        this.authService
          .guardarSesion();

        this.router.navigate([
          '/admin/sessions'
        ]);
      },

      error: (error) => {

        this.cargando = false;

        if (error.status === 401) {
          this.errorMensaje =
            'Usuario o contraseña incorrectos.';

          return;
        }

        this.errorMensaje =
          'No fue posible conectarse con el servidor.';
      }
    });
  }
}