import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/model/offer';

@Component({
  selector: 'offer-card-list',
  templateUrl: './offer-card-list.component.html',
  styleUrls: ['./offer-card-list.component.css']
})
export class OfferCardListComponent implements OnInit {

  offers: Array<Offer>;
  constructor() { }

  ngOnInit() {
    this.offers = JSON.parse(sessionStorage.getItem('offers'));
    console.log(this.offers);
  }

}
