import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  StompSubscription
} from '@stomp/stompjs';

import {
  SupportConversation,
  SupportMessage,
  SupportService
} from '../../core/services/support.service';

import {
  SupportWebSocketService
} from '../../core/services/support-websocket.service';

import {
  AuthService
} from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-support',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './admin-support.component.html',
  styleUrl:
    './admin-support.component.scss'
})
export class AdminSupportComponent
  implements OnInit, OnDestroy {

  conversaciones:
    SupportConversation[] = [];

  conversacionSeleccionada:
    SupportConversation | null = null;

  mensajes:
    SupportMessage[] = [];

  nuevoMensaje = '';

  cargandoConversaciones = false;
  cargandoMensajes = false;
  enviandoMensaje = false;

  private mensajeSubscription:
    StompSubscription | null = null;

  private conversacionesSubscription:
    StompSubscription | null = null;

  constructor(
    private supportService:
      SupportService,

    private supportWebSocketService:
      SupportWebSocketService,

    private authService:
      AuthService,

    private router:
      Router
  ) {}

  ngOnInit(): void {

    this.cargarConversaciones();

    this.supportWebSocketService
      .conectar(() => {

        this.conversacionesSubscription =
          this.supportWebSocketService
            .escucharConversaciones(
              () => {

                this.cargarConversaciones();
              }
            );
      });
  }

  cargarConversaciones(): void {

    this.cargandoConversaciones =
      true;

    this.supportService
      .obtenerConversaciones()
      .subscribe({

        next: (data) => {

          this.conversaciones =
            data;

          this.cargandoConversaciones =
            false;

          // Actualizar también la conversación
          // actualmente seleccionada.
          if (
            this.conversacionSeleccionada
          ) {

            const actualizada =
              data.find(
                conversacion =>
                  conversacion.id ===
                  this.conversacionSeleccionada?.id
              );

            if (actualizada) {

              this.conversacionSeleccionada =
                actualizada;
            }
          }
        },

        error: (error) => {

          console.error(
            'Error obteniendo conversaciones',
            error
          );

          this.cargandoConversaciones =
            false;
        }
      });
  }

  abrirConversacion(
    conversacion:
      SupportConversation
  ): void {

    this.conversacionSeleccionada =
      conversacion;

    this.cargarMensajes(
      conversacion.id
    );

    // Si ya estábamos escuchando otra
    // conversación, dejamos de escucharla.
    this.mensajeSubscription
      ?.unsubscribe();

    // Escuchar esta conversación
    // en tiempo real.
    this.mensajeSubscription =
      this.supportWebSocketService
        .escucharConversacion(
          conversacion.id,
          (mensajeRecibido) => {

            console.log(
              'Mensaje recibido por WebSocket:',
              mensajeRecibido
            );

            this.cargarMensajes(
              conversacion.id
            );

            this.cargarConversaciones();
          }
        );
  }

  cargarMensajes(
    conversationId: number
  ): void {

    this.cargandoMensajes =
      true;

    this.supportService
      .obtenerMensajes(
        conversationId
      )
      .subscribe({

        next: (data) => {

          this.mensajes =
            data;

          this.cargandoMensajes =
            false;
        },

        error: (error) => {

          console.error(
            'Error obteniendo mensajes',
            error
          );

          this.cargandoMensajes =
            false;
        }
      });
  }

  enviarMensaje(): void {

    const conversacion =
      this.conversacionSeleccionada;

    const mensaje =
      this.nuevoMensaje.trim();

    if (
      conversacion == null ||
      mensaje.length === 0
    ) {
      return;
    }

    this.enviandoMensaje =
      true;

    this.supportService
      .enviarMensaje(
        conversacion.id,
        mensaje
      )
      .subscribe({

        next: () => {

          this.nuevoMensaje = '';

          this.enviandoMensaje =
            false;

          /*
           * Ya no dependemos exclusivamente
           * de estas recargas porque WebSocket
           * también notificará el mensaje.
           *
           * Las dejamos como respaldo para que
           * la interfaz siga siendo robusta.
           */

          this.cargarMensajes(
            conversacion.id
          );

          this.cargarConversaciones();
        },

        error: (error) => {

          console.error(
            'Error enviando mensaje',
            error
          );

          this.enviandoMensaje =
            false;
        }
      });
  }

  cerrarConversacion(): void {

    const conversacion =
      this.conversacionSeleccionada;

    if (
      conversacion == null
    ) {
      return;
    }

    this.supportService
      .cerrarConversacion(
        conversacion.id
      )
      .subscribe({

        next: (actualizada) => {

          this.conversacionSeleccionada =
            actualizada;

          this.cargarConversaciones();
        },

        error: (error) => {

          console.error(
            'Error cerrando conversación',
            error
          );
        }
      });
  }

  irActividades(): void {

    this.router.navigate(
      ['/admin/sessions']
    );
  }

  cerrarSesion(): void {

    this.authService
      .cerrarSesion();

    this.router.navigate(
      ['/admin/login']
    );
  }

  ngOnDestroy(): void {

    this.mensajeSubscription
      ?.unsubscribe();

    this.conversacionesSubscription
      ?.unsubscribe();

    this.supportWebSocketService
      .desconectar();
  }
}