import { Component, ViewChild } from '@angular/core';
import { DialogErrorComponent } from '../../components/dialog-error/dialog-error.component';
import { TableServiceComponent } from '../../components/table-service/table-service.component';
import { CommonModule } from '@angular/common';
import { FormSubscriptionsComponent } from '../../components/form-subscriptions/form-subscriptions.component';

@Component({
  selector: 'app-home',
  imports: [TableServiceComponent, DialogErrorComponent, CommonModule, FormSubscriptionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(TableServiceComponent) tableComponent!: TableServiceComponent;
  // @ViewChild(FormSubscriptionsComponent) formSubscription!: FormSubscriptionsComponent;
  
  headerText = "Crie uma nova assinatura"
  showModalError = false;
  totalPrice: number = 0;
  totalSubscriptions: number = 0;
  isFormOpen = false;
  showFormSubs = false;
  resetForm = false;

  onCloseModal() {
    this.showModalError = false;
  }

  onTotalPriceChange(total: number) {
    this.totalPrice = total;
  }

  onTotalSubscriptionsChange(total: number) {
    this.totalSubscriptions = total;
  }

  openForm(){
    this.isFormOpen = true;
  }

  openFormModal() {
    this.showFormSubs = true;
  }

  closeFormModal() {
    this.showFormSubs = false;
  }

  onSubscriptionCreated() {
    this.tableComponent.loadSubscriptions();
  }

  // onResetForm(){
  //   this.formSubscription.onResetForm();
  // }

}
