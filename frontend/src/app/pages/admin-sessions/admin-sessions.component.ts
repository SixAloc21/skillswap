import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';

import {
  SessionService,
  Session
} from '../../core/services/session.service';

import {
  RegistrationService,
  Registration
} from '../../core/services/registration.service';

import {
  AuthService
} from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-sessions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-sessions.component.html',
  styleUrl: './admin-sessions.component.scss'
})
export class AdminSessionsComponent implements OnInit {

  // =========================
  // FORMULARIO
  // =========================

  session: Session =
    this.crearSesionVacia();

  actividadCreada = false;
  actividadEnviada = false;
  guardando = false;

  qrImagen = '';

  // =========================
  // HISTORIAL
  // =========================

  sesiones: Session[] = [];
  cargandoSesiones = false;

  // =========================
  // QR HISTORIAL
  // =========================

  sesionSeleccionada:
    Session | null = null;

  qrHistorial = '';

  // =========================
  // PARTICIPANTES
  // =========================

  participantes:
    Registration[] = [];

  sesionParticipantes:
    Session | null = null;

  cargandoParticipantes = false;

  constructor(
    private sessionService:
      SessionService,

    private registrationService:
      RegistrationService,

    private authService:
      AuthService,

    private router:
      Router
  ) {}

  ngOnInit(): void {
    this.cargarSesiones();
  }

  // =========================
  // CREAR ACTIVIDAD
  // =========================

  crearActividad(): void {

    if (
      this.guardando ||
      this.actividadEnviada
    ) {
      return;
    }

    if (
      !this.session.nombre.trim() ||
      !this.session.descripcion.trim() ||
      !this.session.instructor.trim() ||
      !this.session.fecha ||
      !this.session.hora ||
      Number(this.session.cupo) <= 0
    ) {

      alert(
        'Completa correctamente todos los campos.'
      );

      return;
    }

    const sesionParaEnviar: Session = {

      nombre:
        this.session.nombre.trim(),

      descripcion:
        this.session.descripcion.trim(),

      instructor:
        this.session.instructor.trim(),

      fecha:
        this.session.fecha,

      hora:
        this.session.hora,

      cupo:
        Number(this.session.cupo)
    };

    this.guardando = true;

    this.sessionService
      .crearSesion(
        sesionParaEnviar
      )
      .subscribe({

        next: async (
          sesionGuardada
        ) => {

          console.log(
            'Sesión guardada en PostgreSQL:',
            sesionGuardada
          );

          if (
            sesionGuardada.id == null
          ) {

            this.guardando = false;

            alert(
              'La sesión se guardó pero no recibió un ID.'
            );

            return;
          }

          this.session =
            sesionGuardada;

          this.actividadCreada =
            true;

          this.actividadEnviada =
            true;

          const datosQR =
            sesionGuardada.id
              .toString();

          try {

            this.qrImagen =
              await QRCode.toDataURL(
                datosQR,
                {
                  width: 350,
                  margin: 2
                }
              );

            console.log(
              'ID dentro del QR:',
              datosQR
            );

          } catch (error) {

            console.error(
              'Error al generar código QR:',
              error
            );

            alert(
              'La actividad se guardó, pero no fue posible generar el QR.'
            );

          } finally {

            this.guardando =
              false;

            this.cargarSesiones();
          }
        },

        error: (error) => {

          console.error(
            'Error al guardar la sesión:',
            error
          );

          this.guardando = false;

          alert(
            'No fue posible guardar la actividad en el servidor.'
          );
        }
      });
  }

  // =========================
  // CARGAR ACTIVIDADES
  // =========================

  cargarSesiones(): void {

    this.cargandoSesiones =
      true;

    this.sessionService
      .obtenerSesiones()
      .subscribe({

        next: (
          sesiones
        ) => {

          this.sesiones = [
            ...sesiones
          ].reverse();

          this.cargandoSesiones =
            false;

          console.log(
            'Actividades cargadas:',
            this.sesiones
          );
        },

        error: (
          error
        ) => {

          console.error(
            'Error al cargar actividades:',
            error
          );

          this.cargandoSesiones =
            false;
        }
      });
  }

  // =========================
  // VER QR
  // =========================

  async verQr(
    sesion: Session
  ): Promise<void> {

    if (
      sesion.id == null
    ) {
      return;
    }

    this.cerrarParticipantes();

    this.sesionSeleccionada =
      sesion;

    try {

      this.qrHistorial =
        await QRCode.toDataURL(
          sesion.id.toString(),
          {
            width: 350,
            margin: 2
          }
        );

      console.log(
        'QR regenerado para actividad:',
        sesion.id
      );

    } catch (error) {

      console.error(
        'Error al generar QR del historial:',
        error
      );

      alert(
        'No fue posible generar el código QR.'
      );
    }
  }

  cerrarQrHistorial(): void {

    this.sesionSeleccionada =
      null;

    this.qrHistorial = '';
  }

  // =========================
  // VER PARTICIPANTES
  // =========================

  verParticipantes(
    sesion: Session
  ): void {

    if (
      sesion.id == null
    ) {
      return;
    }

    this.cerrarQrHistorial();

    this.sesionParticipantes =
      sesion;

    this.participantes = [];

    this.cargandoParticipantes =
      true;

    this.registrationService
      .obtenerPorSesion(
        sesion.id
      )
      .subscribe({

        next: (
          registros
        ) => {

          this.participantes =
            registros;

          this.cargandoParticipantes =
            false;

          console.log(
            'Participantes registrados:',
            registros
          );
        },

        error: (
          error
        ) => {

          console.error(
            'Error al cargar participantes:',
            error
          );

          this.cargandoParticipantes =
            false;

          alert(
            'No fue posible consultar los participantes.'
          );
        }
      });
  }

  cerrarParticipantes(): void {

    this.sesionParticipantes =
      null;

    this.participantes = [];

    this.cargandoParticipantes =
      false;
  }

  // =========================
  // NUEVA ACTIVIDAD
  // =========================

  nuevaActividad(): void {

    this.session =
      this.crearSesionVacia();

    this.actividadCreada =
      false;

    this.actividadEnviada =
      false;

    this.guardando =
      false;

    this.qrImagen = '';
  }

  // =========================
  // CERRAR SESIÓN
  // =========================

  cerrarSesion(): void {

    this.cerrarQrHistorial();
    this.cerrarParticipantes();

    this.authService
      .cerrarSesion();

    this.router.navigate([
      '/admin/login'
    ]);
  }

  // =========================
  // SESIÓN VACÍA
  // =========================

  private crearSesionVacia():
    Session {

    return {
      nombre: '',
      descripcion: '',
      instructor: '',
      fecha: '',
      hora: '',
      cupo: 1
    };
  }
}