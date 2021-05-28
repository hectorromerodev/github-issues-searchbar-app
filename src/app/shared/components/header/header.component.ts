import { Component } from '@angular/core';
import { ModalService } from '@service/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private modalServ: ModalService
  ) { }

  openModal(id: string): void {
    this.modalServ.open(id)
  }

  closeModal(id: string): void {
    this.modalServ.close(id);
  }
}
