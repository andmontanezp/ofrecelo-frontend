import { Component, OnInit, ViewChild } from '@angular/core';
import { OffersService } from 'src/app/_services/offers.service';
import { Offer } from 'src/app/model/offer';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  offers: Array<Offer>;
  latLng = new Subject<google.maps.LatLng>();
  markers = [];
  markerMobile = [];
  offersMobile: Array<Offer>;

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  @ViewChild('mapMobile') mapMobileElement: any;
  mapMobile: google.maps.Map;

  constructor(private _service: OffersService) { }

  ngOnInit() {

    this.getCurrentLocation();

    this.latLng.subscribe(result => {
      const mapProperties = {
        //center: result,
        center: new google.maps.LatLng(-33.451487, -70.663676),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
      this._service.getOffers().subscribe(offers => {
        this.offers = offers;
        offers.map(offer => {
          let myLatLng = new google.maps.LatLng(offer.coordinates.latitude, offer.coordinates.longitude);
          let marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: offer.title,
            icon: this.normalIcon()
          });
          this.markers[offer.id.toString()] = marker
          this.getAttachMarker(marker, offer);
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

  getAttachMarker(marker, offer){
    const infowindow = new google.maps.InfoWindow({
      content: this.getInfowindowFromMarker(offer)
    });
    //const equipmentID = id;
    marker.addListener('click', (event) => {
      infowindow.open(marker.get('map'), marker);
      //this.getEquipmentDetails(marker.title);
    });
  }

  getInfowindowFromMarker(offer){
    return '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading">'+ offer.title +'</h3>'+
      '<div id="bodyContent">'+
      '<p>Descripción</p>'+
      '</div>'+
      '</div>';
  }

  normalIcon() {
    return {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(30, 30)
    }
  }
  
  highlightedIcon() {
    return {
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      scaledSize: new google.maps.Size(60, 60),
      anchor: new google.maps.Point(50, 50)
    };
  }

  mouseEnter(offer){
    this.markers[offer.id].setIcon(this.highlightedIcon());
  }

  mouseLeave(offer){
    this.markers[offer.id].setIcon(this.normalIcon());
  }

  showMarker(offer){
    this.offers.forEach(element => {
      this.markers[element.id.toString()].setIcon(this.normalIcon());
    });
    this.markers[offer.id].setIcon(this.highlightedIcon());
  }

}
