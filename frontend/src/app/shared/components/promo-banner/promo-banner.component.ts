import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.scss'
})
export class PromoBannerComponent {
  @Input() title = 'Semana de intercambio guiado';
  @Input() description =
    'Publica una habilidad hoy y recibe una sugerencia de match destacada para practicar con otra persona.';
  @Input() actionLabel = 'Publicar ahora';
  @Input() actionLink = '/publicar';

  isVisible = true;

  dismiss(): void {
    this.isVisible = false;
  }
}
