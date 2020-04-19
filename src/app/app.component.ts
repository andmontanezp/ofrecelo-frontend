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
  
  constructor(private _offersService: OffersService) {

  }

  private offers: Array<Offer>;

  ngOnInit() {

    

    var myLatLng = {lat: -33.4041511, lng: -70.5570019};

    var mapProp = {
      center: new google.maps.LatLng(myLatLng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this._offersService.getOffers().subscribe(
      offers => {
        offers.map(
          offer => {
            const marker = new google.maps.Marker({
              position: {lat: offer.coordinates.latitude, lng: offer.coordinates.longitude},
              map: this.map,
              draggable: true,
              title: offer.title
            });
            this.createInfoWindow(marker, offer);
          }
        );
      } 
    );
  }

  createInfoWindow(marker: google.maps.Marker, offer: Offer) {

    const contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+offer.title+'</h1>'+
            '<div id="bodyContent">'+
            `${offer.title} ${offer.title} ${offer.title}`
            '</div>'+
            '</div>';

    const infoWindow = new google.maps.InfoWindow({
      content: contentString 
    });

    marker.addListener('click', () => {
      infoWindow.open(marker.get('map'), marker);
    });
  } 
}
