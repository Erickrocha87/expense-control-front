import { Component, Output, EventEmitter } from '@angular/core';
import { Subscriptions } from '../../model/subscriptions';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { catchError, Observable, of, map, tap, take } from 'rxjs';
import { FormSubscriptionsComponent } from '../form-subscriptions/form-subscriptions.component';
import { BehaviorSubject } from 'rxjs';
import { PageResponse } from '../../model/page-response';

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
  currentPage = 0;
  totalPages = 0;
  size = 7
  totalElements = 0;
  totalPrice = 0
  
  subscriptions$ = new BehaviorSubject<Subscriptions[]>([]);
  _subscriptions$ = new BehaviorSubject<PageResponse<Subscriptions>>({content: [], totalPages: 0, totalElements: 0, pageNumber: 0, pageSize: this.size, totalPrice: 0});
  // subscriptions$: Observable<Subscriptions[]> = of([]);

  // subscriptionsService: SubscriptionsService;

  constructor(private subscriptionsService: SubscriptionsService) {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionsService.findAll(this.currentPage, this.size).pipe(
      map(response =>{
        const sortedContent = response.content.sort((a,b) => a.serviceName.localeCompare(b.serviceName));
        return {...response, content: sortedContent};
      }),
      catchError(error => {
        this.showModalError = true;
        this.error.emit();
        console.error(error);
        return of({ content: [], totalPages: 0, totalElements: 0, pageNumber: 0, pageSize: this.size, totalPrice: 0 });
      })
    ).subscribe(response => {
      this.subscriptions$.next(response.content);
      this._subscriptions$.next(response);
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.totalPrice = response.totalPrice;
      this.getTotalPrice();
      this.getTotalSubscriptions();
    });

  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadSubscriptions();
    }
  }
  
  getTotalPrice() {
    this._subscriptions$.pipe(
      take(1),
      map(response => response.totalPrice)
    ).subscribe(totalPrice => this.totalPriceChange.emit(totalPrice));
  }

  getTotalSubscriptions() {
    this._subscriptions$.pipe(
      take(1),
      map(subscriptions => subscriptions.totalElements)
    ).subscribe(totalSubscriptions => this.totalSubscriptions.emit(totalSubscriptions));
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadSubscriptions();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadSubscriptions();
    }
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

  onSubmitEditedSubscription(subscription: Subscriptions) {
    if (!subscription.id) return;

    this.subscriptionsService.update(subscription.id, subscription).subscribe((updatedSub) => {
      const currentSubs = this.subscriptions$.getValue();
      const updatedSubs = currentSubs.map(sub =>
        sub.id === updatedSub.id ? { ...sub, ...subscription } : sub
      );
      this.subscriptions$.next(updatedSubs.sort((a, b) => a.serviceName.localeCompare(b.serviceName)));
      this.closeFormModal();
    });
  }

  openFormModal(subscription?: Subscriptions) {
    this.editingSubscription = { ...subscription } as Subscriptions;
    this.showFormSubs = true;
    this.isEditing = true;
  }

  closeFormModal() {
    this.showFormSubs = false;
  }  
  
  closeModalError() {
    this.showModalError = false;
  }
}

   // loadSubscriptions() {
  //     this.subscriptionsService.findAll().subscribe(subs => {
  //       const orderedSubs = subs.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
  //       this.subscriptions$.next(orderedSubs);
  //     }
  //     // map(subscriptions => subscriptions.sort((a, b) => a.serviceName.localeCompare(b.serviceName))),
  //     // catchError(error => {
  //     //   this.showModalError = true;
  //     //   this.error.emit();
  //     //   console.log(error);
  //     //   return of([]);
  //     // })
  //   );



  
  // update(id: number, subscription: Subscriptions) {
  //   console.log(subscription)
  //   console.log('Lista antes:', this.subscriptions$);
  //   console.log('Editando:', this.editingSubscription);
  //   this.subscriptionsService.update(id, subscription).subscribe({
  //     next: () => {
  //       this.loadSubscriptions();
  //     },
  //     error: () => this.showModalError = true
  //   });
  // }