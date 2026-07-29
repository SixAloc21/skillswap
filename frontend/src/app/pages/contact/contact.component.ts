import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  isSubmitting = false;
  showSuccessModal = false;
  showErrorMessage = false;

  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.showErrorMessage = false;

    this.contactService.sendMessage(this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showSuccessModal = true;
        this.contactForm.reset({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      },
      error: () => {
        this.isSubmitting = false;
        this.showErrorMessage = true;
      }
    });
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  hasError(controlName: keyof typeof this.contactForm.controls, errorName: string): boolean {
    const control = this.contactForm.controls[controlName];
    return control.touched && control.hasError(errorName);
  }
}
