import { Component, OnInit, ViewChild } from '@angular/core';
import { OffersService } from 'src/app/_services/offers.service';
import { Offer } from 'src/app/model/offer';
import { Subject, of } from 'rxjs';
import { OfferDTO } from 'src/app/model/offerDTO';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  offers: Array<OfferDTO>;
  latLng = new Subject<google.maps.LatLng>();
  markers = [];
  markerMobile = [];
  offersMobile: Array<Offer>;
  communes: Array<any>;
  showMapMobile: boolean = false;
  showMap: boolean = false;

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  @ViewChild('mapMobile') mapMobileElement: any;
  mapMobile: google.maps.Map;

  constructor(private _service: OffersService) { }

  ngOnInit() {
  }

  getMapDesktop(value){
    this.showMap = true;
    this.showGoogleMap(this.communes[value]);
  }

  showGoogleMap(value){
    this.getCurrentLocation();
    this.latLng.subscribe(result => {
      const mapProperties = {
        //center: result,
        center: new google.maps.LatLng(value.coordinates.latitude, value.coordinates.longitude),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
      this._service.getOffers(value.name.toLowerCase()).subscribe(offers => {
        this.offers = offers;
        console.log(this.offers);
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
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(30, 30)
    };
  }

  mouseEnter(offer){
    this.markers[offer.id].setIcon(this.highlightedIcon());
    return this.getInfowindowFromMarker(offer);
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

  searchCommune(value){
    this.getCommunes();
  }

  getCommunes(){
    this.communes = [
      { "id": 0, "name": "Cerrillos", "coordinates":{
        "latitude": -33.50101070000001,
        "longitude": -70.7098735
      } },
      { "id": 1, "name": "Cerro Navia", "coordinates":{
        "latitude": -33.4218958,
        "longitude": -70.7404531
      } },
      { "id": 2, "name": "Conchalí", "coordinates":{
        "latitude": -33.3846893,
        "longitude": -70.68002129999999
      } },
      { "id": 3, "name": "El Bosque", "coordinates":{
        "latitude": -33.5589761,
        "longitude": -70.67875029999999
      } },
      { "id": 4, "name": "Estación Central", "coordinates":{
        "latitude": -33.46191779999999,
        "longitude": -70.69850989999999
      } },
      { "id": 5, "name": "Huechuraba", "coordinates":{
        "latitude": -33.3742128,
        "longitude": -70.6367425
      } },
      { "id": 6, "name": "Independencia", "coordinates":{
        "latitude": -33.4155974,
        "longitude": -70.6642603
      } },
      { "id": 7, "name": "La Cisterna", "coordinates":{
        "latitude": -33.5264495,
        "longitude": -70.66135109999999
      } },
      { "id": 8, "name": "La Florida", "coordinates":{
        "latitude": -33.5226882,
        "longitude": -70.5987142
      } },
      { "id": 9, "name": "La Granja", "coordinates":{
        "latitude": -33.53779310000001,
        "longitude": -70.62067800000001
      } },
      { "id": 10, "name": "La Pintana", "coordinates":{
        "latitude": -33.5855661,
        "longitude": -70.6285838
      } },
      { "id": 11, "name": "La Reina", "coordinates":{
        "latitude": -33.4411269,
        "longitude": -70.5340591
      } },
      { "id": 12, "name": "Las Condes", "coordinates":{
        "latitude": -33.4125944,
        "longitude": -70.5689716
      } },
      { "id": 13, "name": "Lo Barnechea", "coordinates":{
        "latitude": -33.352669,
        "longitude": -70.518517
      } },
      { "id": 14, "name": "Lo Espejo", "coordinates":{
        "latitude": -33.5220498,
        "longitude": -70.690565
      } },
      { "id": 15, "name": "Lo Prado", "coordinates":{
        "latitude": -33.4442688,
        "longitude": -70.7233493
      } },
      { "id": 16, "name": "Macul", "coordinates":{
        "latitude": -33.4851471,
        "longitude": -70.7233493
      } },
      { "id": 17, "name": "Maipú", "coordinates":{
        "latitude": -33.5105866,
        "longitude": -70.7572607
      } },
      { "id": 18, "name": "Ñuñoa", "coordinates":{
        "latitude": -33.4566678,
        "longitude": -70.5978415
      } },
      { "id": 19, "name": "Padre Hurtado", "coordinates":{
        "latitude": -33.5695362,
        "longitude": -70.8156717
      } },
      { "id": 20, "name": "Pedro Aguirre Cerda", "coordinates":{
        "latitude": -33.4940901,
        "longitude": -70.67650259999999
      } },
      { "id": 21, "name": "Peñaflor", "coordinates":{
        "latitude": -33.60602550000001,
        "longitude": -70.8781837
      } },
      { "id": 22, "name": "Peñalolén", "coordinates":{
        "latitude": -33.4719116,
        "longitude": -70.5627854
      } },
      { "id": 23, "name": "Providencia", "coordinates":{
        "latitude": -33.4314474,
        "longitude": -70.6093325
      } },
      { "id": 24, "name": "Pudahuel", "coordinates":{
        "latitude": -33.4421135,
        "longitude": -70.7640644
      } },
      { "id": 25, "name": "Puente Alto", "coordinates":{
        "latitude": -33.6186082,
        "longitude": -70.5906057
      } },
      { "id": 26, "name": "Quilicura", "coordinates":{
        "latitude": -33.3576747,
        "longitude": -70.72927179999999
      } },
      { "id": 27, "name": "Quinta Normal", "coordinates":{
        "latitude": -33.4317378,
        "longitude": -70.6923917
      } },
      { "id": 28, "name": "Recoleta", "coordinates":{
        "latitude": -33.4061916,
        "longitude": -70.6336176
      } },
      { "id": 29, "name": "Renca", "coordinates":{
        "latitude": -33.4063601,
        "longitude": -70.7279965
      } },
      { "id": 30, "name": "San Bernardo", "coordinates":{
        "latitude": -33.5854485,
        "longitude": -70.69873609999999
      } },
      { "id": 31, "name": "San Joaquín", "coordinates":{
        "latitude": -33.496202,
        "longitude": -70.6283361
      } },
      { "id": 32, "name": "San Miguel", "coordinates":{
        "latitude": -33.4923174,
        "longitude": -70.6517628
      } },
      { "id": 33, "name": "San Ramón", "coordinates":{
        "latitude": -33.5510207,
        "longitude": -70.6464256
      } },
      { "id": 34, "name": "Santiago", "coordinates":{
        "latitude": -33.4574739 ,
        "longitude": -70.697282
      } },
      { "id": 35, "name": "Vitacura", "coordinates":{
        "latitude": -33.3905211,
        "longitude": -70.57241239999999
      } }
    ]
  }

  getMapMobile(commune){
    this.showMapMobile = true;
    this.showGoogleMap(commune);
  }

}
