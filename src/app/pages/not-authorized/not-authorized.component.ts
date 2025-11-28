import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css'],
})
export class NotAuthorizedComponent {
  constructor(public modalService: ModalService) {}

  close() {
    this.modalService.hideAccessDenied();
  }
}
