import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/model/offer';
import { OffersService } from '../../_services/offers.service';

@Component({
  selector: 'edit-offer-card-list',
  templateUrl: './edit-offer-card-list.component.html',
  styleUrls: ['./edit-offer-card-list.component.css']
})
export class EditOfferCardListComponent implements OnInit {

  offers: Array<Offer>;
  constructor(private offerService: OffersService) { }

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
      console.log(data);
    },error=>{
      console.log(error);
    })
  }

}
