import { AuthenticationService } from './_services/authentication.service';
import { Coordinates } from './model/coordinates';
import { Offer } from './model/offer';
import { Component, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { OffersService } from './_services/offers.service';
import { Observable, Subject } from 'rxjs';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  
  title = 'ofrecelo-frontend';
  
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
