import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from '@service/modal.service';

@Component({
  selector: 'popup-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  private element: HTMLElement;

  constructor(
    private modalServ: ModalService,
    private ele: ElementRef,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.element = ele.nativeElement;
  }

  ngOnInit(): void {
    // Ensure id attribute exists
    if (!this.id) {
      console.error('Modal must have an id');
      return;
    }
    // Move element to bottom of page (just before </body>) so it cana be  displayer above everything else
    this.doc.body.appendChild(this.element);
    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'popup-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's a accessible from controllers
    this.modalServ.add(this);
  }

  // Remove self from service
  ngOnDestroy(): void {
    this.modalServ.remove(this.id);
    this.element.remove();
  }

  // Open modal
  open(): void {
    this.element.style.display = 'block';
    this.doc.body.classList.add('popup-modal-open');
  }

  // Close modal
  close(): void {
    this.element.style.display = 'none';
    this.doc.body.classList.remove('popup-modal-open');
  }
}
