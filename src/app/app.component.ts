import { Offer } from './model/Offer';
import { Component, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { OffersService } from './offers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  
  title = 'ofrecelo-frontend';
  
  constructor(private offersService: OffersService) {

  }

  private offers: Array<Offer>;

  ngOnInit() {

    this.offersService.getOffers().subscribe(
      offers => {
        console.log(JSON.stringify(offers))
        this.offers
      } 
    );

    var myLatLng = {lat: -33.4041511, lng: -70.5570019};

    var mapProp = {
      center: new google.maps.LatLng(myLatLng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);


    var marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      draggable: true,
      title: 'My title'
    });
  }
}
