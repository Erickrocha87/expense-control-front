import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriptionsService } from '../../services/subscriptions.service';


@Component({
  selector: 'app-form-subscriptions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-subscriptions.component.html',
  styleUrl: './form-subscriptions.component.scss'
})
export class FormSubscriptionsComponent {

  formCreateSubscription!: FormGroup;

  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() subscriptionCreated = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  constructor(private formBuilder: FormBuilder, private subscriptionsService: SubscriptionsService) {
    this.formCreateSubscription = this.formBuilder.group({
      serviceName: ['', Validators.required],
      price: ['', Validators.required],
      frequency: ['', Validators.required],
      dueDate: ['', Validators.required]
    })

  }

  onSubmit() {
    if (this.formCreateSubscription.valid) {
      this.subscriptionsService.create(this.formCreateSubscription.value).subscribe({
        next: () => {
          this.subscriptionCreated.emit();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao criar assinatura:', error);
        }
      });
    }
  }
}
