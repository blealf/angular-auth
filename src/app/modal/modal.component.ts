import { Component, OnInit, DoCheck } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, DoCheck {

  content: string = ''
  show: boolean = false
  actionText: string = ''
  constructor(private modalService: ModalService) {
  }
  
  ngOnInit(): void {
    this.show = this.modalService.showModal
    this.content = this.modalService.modalText
    this.actionText = this.modalService.actionText
  }
  
  ngDoCheck() {
    this.show = this.modalService.showModal
    this.content = this.modalService.modalText
    this.actionText = this.modalService.actionText
  }

  close() {
    this.modalService.closeModal()
  }

}
