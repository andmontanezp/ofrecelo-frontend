import { Coordinates } from './model/coordinates';
import { Offer } from './model/offer';
import { Component, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { OffersService } from './_services/offers.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  title = 'ofrecelo-frontend';
  
  constructor() {

  }
}
