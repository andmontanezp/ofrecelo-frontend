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
  @ViewChild('gmap') gmapElement: any;
  map: Subject<google.maps.Map> = new Subject();
  
  title = 'ofrecelo-frontend';
  
  constructor(private _offersService: OffersService) {

  }

  private offers: Array<Offer>;

  coordinates = new Subject<Coordinates>();

  ngOnInit() {

    navigator.geolocation.getCurrentPosition(pos => {
      let coord = new Coordinates();
      coord.latitude = pos.coords.latitude;
      coord.longitude = pos.coords.longitude;
      this.coordinates.next(coord)
    });

    this.coordinates.subscribe(c => {
      var myLatLng = {lat: c.latitude, lng: c.longitude};
      var mapProp = {
        center: new google.maps.LatLng(myLatLng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      let myMap = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      this.map.next(myMap);
    });

    var myLatLng = {lat: 0, lng: 0};

    var mapProp = {
      center: new google.maps.LatLng(myLatLng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let myMap = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.map.next(myMap);

    this.map.subscribe(m => {
      this._offersService.getOffers().subscribe(
        offers => {
          offers.map(
            offer => {
              const marker = new google.maps.Marker({
                position: {lat: offer.coordinates.latitude, lng: offer.coordinates.longitude},
                map: m,
                draggable: true,
                title: offer.title
              });
              this.createInfoWindow(marker, offer);
            }
          );
        } 
      );
    });
    
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
