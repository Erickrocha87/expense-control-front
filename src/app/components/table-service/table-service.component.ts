import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Subscriptions } from '../../model/subscriptions';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { catchError, Observable, of, map, tap, take, identity } from 'rxjs';
import { FormSubscriptionsComponent } from '../form-subscriptions/form-subscriptions.component';
import { BehaviorSubject } from 'rxjs';
import { PageResponse } from '../../model/page-response';

@Component({
  selector: 'app-table-service',
  imports: [CommonModule, FormSubscriptionsComponent],
  templateUrl: './table-service.component.html',
  styleUrl: './table-service.component.scss',
})
export class TableServiceComponent {
  @Input() selectedStatus: string = '';

  @Output() error = new EventEmitter<void>();
  @Output() totalPriceChange = new EventEmitter<number>();
  @Output() totalSubscriptions = new EventEmitter<number>();
  @Output() statusChanged = new EventEmitter<string>();

  editingSubscription: Subscriptions | null = null;
  isEditing: boolean = false;
  headerText = 'Editar assinatura';
  showModalError = false;
  showFormSubs = false;
  currentPage = 0;
  totalPages = 0;
  size = 7;
  totalElements = 0;
  totalPrice = 0;

  subscriptions$ = new BehaviorSubject<Subscriptions[]>([]);
  _subscriptions$ = new BehaviorSubject<PageResponse<Subscriptions>>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: this.size,
    totalPrice: 0,
  });
 
  constructor(private subscriptionsService: SubscriptionsService) {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionsService
      .findAll(this.currentPage, this.size)
      .pipe(
        map((response) => {
          const sortedContent = response.content.sort((a, b) =>
            a.serviceName.localeCompare(b.serviceName)
          );
          this.subscriptions$.next(sortedContent);
          this._subscriptions$.next(response);
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.totalPrice = response.totalPrice;
          this.getTotalPrice();
          this.getTotalSubscriptions();
        }),
        catchError((error) => {
          this.showModalError = true;
          this.error.emit();
          console.error(error);
          return of({
            content: [],
            totalPages: 0,
            totalElements: 0,
            pageNumber: 0,
            pageSize: this.size,
            totalPrice: 0,
          });
        })
      )
      .subscribe();
  }

  filteredByStatus() {
    this.subscriptionsService
      .findByStatus(this.selectedStatus, this.currentPage, this.size)
      .pipe(
        map((response) => {
          const sortedContent = response.content.sort((a, b) =>
            a.serviceName.localeCompare(b.serviceName)
          );
          this.subscriptions$.next(sortedContent);
          this._subscriptions$.next(response);
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.totalPrice = response.totalPrice;
          this.getTotalPrice();
          this.getTotalSubscriptions();
        }),
        catchError((error) => {
          this.showModalError = true;
          this.error.emit();
          console.error(error);
          return of({
            content: [],
            totalPages: 0,
            totalElements: 0,
            pageNumber: 0,
            pageSize: this.size,
            totalPrice: 0,
          });
        })
      )
      .subscribe();
  }

  ngOnChanges() {
    if (this.selectedStatus) {
      this.filteredByStatus();
      this.statusChanged.emit(this.selectedStatus);
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadSubscriptions();
      if (this.currentPage == null) {
        this.loadSubscriptions();
        this.goToPage(page - 1);
      }
    }
  }

  getTotalPrice() {
    this._subscriptions$
      .pipe(
        take(1),
        map((response) => response.totalPrice)
      )
      .subscribe((totalPrice) => this.totalPriceChange.emit(totalPrice));
  }

  getTotalSubscriptions() {
    this._subscriptions$
      .pipe(
        take(1),
        map((subscriptions) => subscriptions.totalElements)
      )
      .subscribe((totalSubscriptions) =>
        this.totalSubscriptions.emit(totalSubscriptions)
      );
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
        const currentElements = this.totalElements - 1;
        const isLastItemOnPage =
          currentElements % this.size === 0 && this.currentPage > 0;
        if (isLastItemOnPage) {
          this.currentPage--;
        }
        if (this.selectedStatus) {
          this.filteredByStatus();
        } else {
          this.loadSubscriptions();
        }
      },
      error: () => (this.showModalError = true),
    });
  }

  onSubmitEditedSubscription(subscription: Subscriptions) {
    if (!subscription.id) return;
    this.subscriptionsService
      .update(subscription.id, subscription)
      .subscribe((updatedSub) => {
        if (this.selectedStatus) {
          this.filteredByStatus();
        } else {
          this.loadSubscriptions();
        }

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
