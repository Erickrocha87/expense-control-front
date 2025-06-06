import { Component, ViewChild } from '@angular/core';
import { DialogErrorComponent } from '../../components/dialog-error/dialog-error.component';
import { TableServiceComponent } from '../../components/table-service/table-service.component';
import { CommonModule } from '@angular/common';
import { FormSubscriptionsComponent } from '../../components/form-subscriptions/form-subscriptions.component';
import { Subscriptions } from '../../model/subscriptions';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-home',
  imports: [TableServiceComponent, DialogErrorComponent, CommonModule, FormSubscriptionsComponent, FormsModule, SideMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(TableServiceComponent) tableComponent!: TableServiceComponent;
  
  constructor(private subscriptionService: SubscriptionsService, private toastr: ToastrService){}

  headerText = "Crie uma nova assinatura"
  showModalError = false;
  totalPrice: number = 0;
  totalSubscriptions: number = 0;
  isFormOpen = false;
  showFormSubs = false;
  resetForm = false;
  selectedStatus = '';

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

  onStatusChanged() {
    console.log('Status filtrado:', this.selectedStatus);
  }

  onSubmitNewSubscription(data: Subscriptions | SubmitEvent) {

    if (!(data instanceof Object) || (data as SubmitEvent).isTrusted) {
      console.warn('Ignorando evento de submit inválido:', data);
      return;
    }

    const subscription = data as Subscriptions;
    console.log('Home subs', subscription)
    this.subscriptionService.create(subscription).subscribe({
      next: (response) => {
        console.log('Assinatura criada com sucesso', response);
        this.toastr.success("Assinatura criada com sucesso")
        this.tableComponent.loadSubscriptions();
        this.closeFormModal();
      },
      error: () => {
        this.toastr.error('Erro ao criar assinatura:');
      }
    
    });


  }
  


}
