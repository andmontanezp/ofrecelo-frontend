import { Coordinates } from './model/Coordinates';
import { Offer } from './model/Offer';
import { Component, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { OffersService } from './offers.service';
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
