import { Component, Output, EventEmitter } from '@angular/core';
import { Subscriptions } from '../../model/subscriptions';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { catchError, Observable, of, map } from 'rxjs';
import { FormSubscriptionsComponent } from '../form-subscriptions/form-subscriptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-service',
  imports: [CommonModule, FormSubscriptionsComponent],
  templateUrl: './table-service.component.html',
  styleUrl: './table-service.component.scss'
})
export class TableServiceComponent {
  @Output() error = new EventEmitter<void>();
  @Output() totalPriceChange = new EventEmitter<number>();
  @Output() totalSubscriptions = new EventEmitter<number>();

  editingSubscription: Subscriptions | null = null;
  isEditing: boolean = false;

  headerText = "Editar assinatura"
  showModalError = false;
  showFormSubs = false;

  subscriptions$: Observable<Subscriptions[]> = of([]);

  // subscriptionsService: SubscriptionsService;

  constructor(private subscriptionsService: SubscriptionsService) {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptions$ = this.subscriptionsService.findAll().pipe(
      catchError(error => {
        this.showModalError = true;
        this.error.emit();
        console.log(error);
        return of([]);
      })
    );
    this.getTotalPrice();
    this.getTotalSubscriptions();
  }

  closeModalError() {
    this.showModalError = false;
  }

  confirmDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir esta assinatura?')) {
      this.delete(id);
    }
  }

  delete(id: number) {
    this.subscriptionsService.delete(id).subscribe({
      next: () => {
        this.loadSubscriptions();
      },
      error: () => this.showModalError = true
    });
  }

  update(id: number, subscription: Subscriptions) {
    console.log(subscription)
    this.subscriptionsService.update(id, subscription).subscribe({
      next: () => {
        this.loadSubscriptions();
      },
      error: () => this.showModalError = true
    });
  }

  getTotalPrice() {
    this.subscriptions$.pipe(
      map(subscriptions => subscriptions.reduce((acc, sub) => acc + sub.price, 0))
    ).subscribe(totalPrice => this.totalPriceChange.emit(totalPrice));
  }

  getTotalSubscriptions() {
    this.subscriptions$.pipe(
      map(subscriptions => subscriptions.length)
    ).subscribe(totalSubscriptions => this.totalSubscriptions.emit(totalSubscriptions));
  }

  openFormModal(subscription?: Subscriptions) {
    this.editingSubscription = subscription ?? null;
    this.showFormSubs = true;
    this.isEditing = true;
  }

  closeFormModal() {
    this.showFormSubs = false;
  }  
}

 