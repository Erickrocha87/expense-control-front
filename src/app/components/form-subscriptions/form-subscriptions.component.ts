import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { Subscriptions } from '../../model/subscriptions';


@Component({
  selector: 'app-form-subscriptions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-subscriptions.component.html',
  styleUrl: './form-subscriptions.component.scss'
})
export class FormSubscriptionsComponent {

  formSubscription!: FormGroup;

  private subscription?: Subscriptions;

  @Input() isEditing: boolean = false;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Subscriptions>();
  @Input() headerText: string | null = null
  @Input() subscriptionToEdit: Subscriptions | null = null;
  @Output() resetForm = new EventEmitter<void>();


  constructor(private formBuilder: FormBuilder, private subscriptionsService: SubscriptionsService) {
    this.initForm()
  }

  closeModal() {
    this.close.emit();
  }

  initForm(){
      this.formSubscription = this.formBuilder.group({
      serviceName: ['', Validators.required],
      price: ['', Validators.required],
      dueDate: ['', Validators.required],
      frequency: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnChanges(): void {
    if(this.subscriptionToEdit){
      this.subscription = this.subscriptionToEdit
      this.formSubscription.patchValue(this.subscriptionToEdit)
    }else{
      this.formSubscription.reset();
    }
  }

  onSubmit() {
    if (this.formSubscription.valid) {
      if(this.subscription?.id){
        console.log('FormGroup', this.formSubscription.value)
        console.log(this.subscription.id)
        this.subscriptionsService.update(this.subscription.id, this.formSubscription.value).subscribe({
          next: () => {
            this.submit.emit();
            this.closeModal();
          },
        });
      }else{
         console.log(this.formSubscription.value)
        this.subscriptionsService.create(this.formSubscription.value).subscribe({
          next: () => {
            this.submit.emit();
            this.closeModal();
          },
          error: (error) => {
            console.error('Erro ao criar assinatura:', error);
          }
        });
       }
    }
  }

  // onResetForm(){
  //   this.formSubscription.reset();
  //   this.resetForm.emit();
  // }
}
