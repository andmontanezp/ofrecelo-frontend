import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { OffersService } from '../../_services/offers.service';
import { EditOfferCardListComponent} from './edit-offer-card-list.component';



@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title"> Por favor confirmar</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p> Vas a eliminar la oferta  <b>{{name}}</b>, estas seguro?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      <button class="btn btn-primary" (click)="deleteOffer(id)" > Eliminar</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;
  @Input() id;
  deleted : boolean = false;

  constructor(public activeModal: NgbActiveModal, private offerService: OffersService) {}

  deleteOffer(offerId: string){
    this.deleted= true;
    this.activeModal.close('Close click');
    // this.offerService.deleteOffer(offerId).subscribe((data) => {
    //   this.deleted= true;
    //   console.log(data);
    // },error=>{
    //   console.log(error);
    // })
  }
}