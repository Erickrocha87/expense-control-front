import { Component } from '@angular/core';
import { DialogErrorComponent } from '../../components/dialog-error/dialog-error.component';
import { TableServiceComponent } from '../../components/table-service/table-service.component';

@Component({
  selector: 'app-home',
  imports: [TableServiceComponent, DialogErrorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showModalError = false;

  onCloseModal() {
    this.showModalError = false;
  }
}
