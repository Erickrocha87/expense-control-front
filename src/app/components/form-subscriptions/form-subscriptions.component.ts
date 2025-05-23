import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { Subscriptions } from '../../model/subscriptions';

@Component({
  selector: 'app-form-subscriptions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-subscriptions.component.html',
  styleUrl: './form-subscriptions.component.scss',
})
export class FormSubscriptionsComponent implements OnChanges {
  @Input() isEditing: boolean = false;
  @Input() isOpen: boolean = false;
  @Input() headerText: string | null = null;
  @Input() subscriptionToEdit: Subscriptions | null = null;

  @Output() resetForm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Subscriptions>();

  formSubscription!: FormGroup;
  private subscription?: Subscriptions;

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionsService: SubscriptionsService
  ) {
    this.initForm();
  }

  closeModal() {
    this.close.emit();
  }

  initForm() {
    this.formSubscription = this.formBuilder.group({
      serviceName: ['', Validators.required],
      price: ['', Validators.required],
      dueDate: ['', Validators.required],
      frequency: ['', Validators.required], //O ERRO DE POST ESTÁ AQUI
      status: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.subscriptionToEdit) {
      console.log('ngOnChanges chamado com:', this.subscriptionToEdit);
      this.subscription = this.subscriptionToEdit;
      this.formSubscription.patchValue(this.subscriptionToEdit);
    } else {
      this.initForm();
    }
  }

  onSubmit() {
    if (this.formSubscription.valid) {
      const formValue = this.formSubscription.value;

      const subscription = {
        ...this.subscription,
        ...formValue,
        price: parseFloat(formValue.price.toString().replace(',', '.')),
      } as Subscriptions;

      console.log('Enviando formulário:', subscription);
      this.submit.emit(subscription);
      this.formSubscription.reset();
    } else {
      console.warn('Form inválido, envio ignorado.');
    }
  }
}