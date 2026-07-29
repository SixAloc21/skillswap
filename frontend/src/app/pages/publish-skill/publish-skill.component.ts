import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CURRENT_USER } from '../../core/data/mock-users';
import { Skill } from '../../core/models/skill.model';
import { SkillService } from '../../core/services/skill.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-publish-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ModalComponent],
  templateUrl: './publish-skill.component.html',
  styleUrl: './publish-skill.component.scss'
})
export class PublishSkillComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly skillService = inject(SkillService);

  readonly categories = ['Tecnologia', 'Idiomas', 'Arte', 'Musica', 'Fitness', 'Cocina', 'Fotografia', 'Matematicas'];
  readonly levels: Skill['level'][] = ['Basico', 'Intermedio', 'Avanzado'];
  readonly modalities: Skill['modality'][] = ['Online', 'Presencial', 'Hibrido'];

  showSuccessModal = false;
  createdSkillId = '';

  readonly publishForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    category: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(30)]],
    level: ['Basico' as Skill['level'], Validators.required],
    modality: ['Online' as Skill['modality'], Validators.required],
    exchangeFor: ['', [Validators.required, Validators.minLength(6)]],
    availability: ['', [Validators.required, Validators.minLength(6)]],
    userName: [CURRENT_USER.name, [Validators.required, Validators.minLength(3)]]
  });

  submit(): void {
    if (this.publishForm.invalid) {
      this.publishForm.markAllAsTouched();
      return;
    }

    const userName = this.publishForm.getRawValue().userName;

    this.skillService.addSkill(this.publishForm.getRawValue()).subscribe((createdSkill) => {
      this.createdSkillId = createdSkill.id;
      this.showSuccessModal = true;

      this.publishForm.reset({
        title: '',
        category: '',
        description: '',
        level: 'Basico',
        modality: 'Online',
        exchangeFor: '',
        availability: '',
        userName
      });
    });
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  viewCreatedSkill(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/habilidad', this.createdSkillId]);
  }

  hasError(controlName: keyof typeof this.publishForm.controls, errorName: string): boolean {
    const control = this.publishForm.controls[controlName];
    return control.touched && control.hasError(errorName);
  }
}
