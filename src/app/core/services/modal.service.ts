import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];

  // Add to active modals
  add(modal: any): void {
    this.modals.push(modal);
  }
  remove(id: string): void {
    this.modals = this.modals.filter(modal => modal.id !== id);
  }
  open(id: string): void {
    const modal = this.modals.find(modal => modal.id === id);
    modal.open();
  }
  close(id: string): void {
    const modal = this.modals.find(modal => modal.id === id);
    modal.close();
  }
}
