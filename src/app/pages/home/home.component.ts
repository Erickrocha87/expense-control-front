import { Component } from '@angular/core';
import { DialogErrorComponent } from '../../components/dialog-error/dialog-error.component';
import { TableServiceComponent } from '../../components/table-service/table-service.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TableServiceComponent, DialogErrorComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showModalError = false;
  totalPrice: number = 0;
  totalSubscriptions: number = 0;
  
  onCloseModal() {
    this.showModalError = false;
  }

  onTotalPriceChange(total: number) {
    this.totalPrice = total;
  }

  onTotalSubscriptionsChange(total: number) {
    this.totalSubscriptions = total;
  }
}
