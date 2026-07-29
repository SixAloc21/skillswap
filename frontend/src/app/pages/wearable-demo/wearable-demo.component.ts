import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatchRequest, MatchStatus } from '../../core/models/match-request.model';
import { MatchService } from '../../core/services/match.service';

@Component({
  selector: 'app-wearable-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wearable-demo.component.html',
  styleUrl: './wearable-demo.component.scss'
})
export class WearableDemoComponent implements OnInit {
  private readonly matchService = inject(MatchService);

  notification: MatchRequest | null = null;
  notificationStatus: MatchStatus = 'Pendiente';
  actionMessage = 'Cargando solicitudes reales desde la API wearable de SkillSwap.';

  ngOnInit(): void {
    this.loadNotification();
  }

  setStatus(status: MatchStatus): void {
    if (!this.notification) {
      return;
    }

    const action = status === 'Aceptado' ? 'accept' : status === 'Rechazado' ? 'reject' : 'later';

    this.matchService.updateWearableNotification(this.notification.id, action).subscribe((updatedNotification) => {
      this.notification = updatedNotification;
      this.notificationStatus = updatedNotification.status;
      this.actionMessage =
        {
          Pendiente: 'La solicitud queda pendiente para revisarse despues.',
          Aceptado: 'La notificacion confirma el intercambio desde el endpoint wearable.',
          Rechazado: 'La accion de rechazo actualiza el backend y cambia el estado visual.',
          'Ver despues': 'La solicitud se mantiene disponible para retomarse desde el reloj.'
        }[updatedNotification.status];
    });
  }

  private loadNotification(): void {
    this.matchService.getWearableNotifications().subscribe((notifications) => {
      this.notification = notifications[0] ?? null;
      this.notificationStatus = this.notification?.status ?? 'Pendiente';
      this.actionMessage = this.notification
        ? 'Esta tarjeta compacta viene de /api/wearable/notifications.'
        : 'No hay solicitudes pendientes para mostrar en el smartwatch.';
    });
  }
}
