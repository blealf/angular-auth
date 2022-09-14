import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public showModal: boolean = false
  public modalText: string = ''
  public actionText: string = ''
  constructor() { }

  showTextModal(content: string, action?: string) {
    this.showModal = true
    this.modalText = content
    this.actionText = action || ''
  }

  closeModal() {
    this.showModal = false
  }

}
