import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Skill } from '../../../core/models/skill.model';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss'
})
export class SkillCardComponent {
  @Input({ required: true }) skill!: Skill;
  @Input() showRequestButton = true;

  @Output() viewDetail = new EventEmitter<string>();
  @Output() requestExchange = new EventEmitter<Skill>();

  getModalityClass(modality: Skill['modality']): string {
    return {
      Online: 'badge badge--online',
      Presencial: 'badge badge--presencial',
      Hibrido: 'badge badge--hibrido'
    }[modality];
  }

  onViewDetail(): void {
    this.viewDetail.emit(this.skill.id);
  }

  onRequestExchange(): void {
    this.requestExchange.emit(this.skill);
  }
}
