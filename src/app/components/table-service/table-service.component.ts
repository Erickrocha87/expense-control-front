import { Component, Output, EventEmitter } from '@angular/core';
import { Subscriptions } from '../../model/subscriptions';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { catchError, Observable, of } from 'rxjs';


@Component({
  selector: 'app-table-service',
  imports: [CommonModule],
  templateUrl: './table-service.component.html',
  styleUrl: './table-service.component.scss'
})
export class TableServiceComponent {
  @Output() error = new EventEmitter<void>();
  
  showModalError = false;
  
  subscriptions$: Observable<Subscriptions[]>;

  // subscriptionsService: SubscriptionsService;

  constructor(private subscriptionsService: SubscriptionsService) {
    // this.subscriptionsService = new SubscriptionsService();
    this.subscriptions$ = this.subscriptionsService.findAll().pipe(
      catchError(error =>{
        this.showModalError = true;
        this.error.emit();
        console.log(error);
        return of([]);
      })
    );
  }

  closeModalError() {
    this.showModalError = false;
  }


}

 