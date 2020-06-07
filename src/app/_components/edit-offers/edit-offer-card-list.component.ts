import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Offer } from 'src/app/model/offer';
import { OffersService } from '../../_services/offers.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './modal-content';

@Component({
  selector: 'edit-offer-card-list',
  templateUrl: './edit-offer-card-list.component.html',
  styleUrls: ['./edit-offer-card-list.component.css']
})
export class EditOfferCardListComponent implements OnInit {

  @ViewChild(NgbdModalContent) child;

  modal : any;
  offers: Array<Offer>;

  constructor(private offerService: OffersService, private modalService: NgbModal) { }

  open(title: string, id:string, template: TemplateRef<any>) {
    this.modal= this.modalService.open(template);
    this.modal.title = title;
    this.modal.id = id;
  }
  ngOnInit() {
    this.offerService.getOffersBUser().subscribe((data) => {
      this.offers = data;
      console.log(data);
    },error=>{
      console.log(error);
    })
    console.log(this.offers);
  }

  deleteOffer(offerId: string){
     this.offerService.deleteOffer(offerId).subscribe((data) => {
        this.ngOnInit();
          this.modal.close();
      console.log(data);
    },error=>{
      console.log(error);
    })
  }

}
