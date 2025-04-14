import { Component } from '@angular/core';
import { Subscriptions } from '../../model/subscriptions';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../services/subscriptions.service';


@Component({
  selector: 'app-table-service',
  imports: [CommonModule],
  templateUrl: './table-service.component.html',
  styleUrl: './table-service.component.scss'
})
export class TableServiceComponent {

  subscriptions: Subscriptions[] = [];

  // subscriptionsService: SubscriptionsService;

  constructor(private subscriptionsService: SubscriptionsService) {
    // this.subscriptionsService = new SubscriptionsService();
    this.subscriptions = this.subscriptionsService.findAll();
  }

}
