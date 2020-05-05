import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/model/offer';

@Component({
  selector: 'offer-list-mobile',
  templateUrl: './offer-list-mobile.component.html',
  styleUrls: ['./offer-list-mobile.component.css']
})
export class OfferListMobileComponent implements OnInit {

  offers: Array<Offer>;
  constructor() { }

  ngOnInit() {
    this.offers = JSON.parse(sessionStorage.getItem('offers'));
    console.log(this.offers);
  }

}
