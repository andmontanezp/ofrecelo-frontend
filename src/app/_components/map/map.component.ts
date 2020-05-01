import { Component, OnInit, ViewChild } from '@angular/core';
import { OffersService } from 'src/app/_services/offers.service';
import { Offer } from 'src/app/model/offer';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  offers: Array<Offer>;
  latLng = new Subject<google.maps.LatLng>();

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  constructor(private _service: OffersService) { }

  ngOnInit() {

    this.getCurrentLocation();

    this.latLng.subscribe(result => {
      const mapProperties = {
        center: result,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
      this._service.getOffers().subscribe(offers => {
        offers.map(offer => {
          let myLatLng = new google.maps.LatLng(offer.coordinates.latitude, offer.coordinates.longitude);
          let marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: offer.title
          });
        });
      });

    });
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(this.locationSuccess.bind(this), (error) => { });
  }

  locationSuccess(position) {
    this.latLng.next(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    console.log(JSON.stringify(position));
  }


}
