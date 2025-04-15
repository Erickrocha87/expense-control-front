import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-error',
  imports: [CommonModule],
  templateUrl: './dialog-error.component.html',
  styleUrl: './dialog-error.component.scss'
})
export class DialogErrorComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
}
