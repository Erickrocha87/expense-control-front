import { Component, ViewChild } from '@angular/core';
import { DialogErrorComponent } from '../../components/dialog-error/dialog-error.component';
import { TableServiceComponent } from '../../components/table-service/table-service.component';
import { CommonModule } from '@angular/common';
import { FormSubscriptionsComponent } from '../../components/form-subscriptions/form-subscriptions.component';
import { Subscriptions } from '../../model/subscriptions';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [TableServiceComponent, DialogErrorComponent, CommonModule, FormSubscriptionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(TableServiceComponent) tableComponent!: TableServiceComponent;
  // @ViewChild(FormSubscriptionsComponent) formSubscription!: FormSubscriptionsComponent;
  
  constructor(private subscriptionService: SubscriptionsService, private toastr: ToastrService){}

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

  openFormModalCreate() {
    this.showFormSubs = true;
  }

  closeFormModal() {
    this.showFormSubs = false;
  }

  // onSubscriptionCreated() {
  //   this.tableComponent.loadSubscriptions();
  // }
  onSubmitNewSubscription(subscription: Subscriptions) {
    console.log('Home subs', subscription)
    this.subscriptionService.create(subscription).subscribe({
      next: (response) => {
        console.log('Assinatura criada com sucesso', response);
        this.toastr.success("Login realizado com sucesso")
        this.tableComponent.loadSubscriptions();
      },
      error: (error) => {
        this.toastr.error("deu brete")
        console.error('Erro ao criar assinatura:', error);
      }
    });
  }
  
  // onResetForm(){
  //   this.formSubscription.onResetForm();
  // }

}
