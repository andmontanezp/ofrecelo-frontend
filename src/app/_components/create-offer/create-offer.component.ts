import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { Router} from '@angular/router';
import {ValidatorFn} from '@angular/forms/src/directives/validators';

import { OffersService } from '../../_services/offers.service';
import { Offer } from 'src/app/model/offer';
import { Coordinates } from 'src/app/model/coordinates';
import { Address } from 'src/app/model/address';
import { OfferRequest } from 'src/app/model/offerRequest';

declare const google: any;

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  @ViewChild("search")
  public searchLocaltion: ElementRef;

  formdata;
  coordinates: Coordinates = {latitude: 0, longitude: 0};
  offer: Offer = {id: '', title: '', coordinates: this.coordinates, offerFile: undefined, description: undefined, offerType: undefined};
  address: Address = {countryName: '', regionName: '', cityName: '', streetName: '', streetNumber: 0}

  fileUpload: File;
  fileName: string = 'Seleccione un archivo';
  showErrorUploadFile: boolean = false;
  offerRequest: OfferRequest = {id: '', offerTitle: '', offerLatitude: 0, offerLongitude: 0, district: '',
  file:'', fileExtension: '', fileName: '', description: undefined, offerType: undefined};
  fileEncoded: string = '';

  constructor(
    private offerService: OffersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      offerTitle: new FormControl('', Validators.compose([
         Validators.required,
         Validators.minLength(6),
         Validators.pattern('^[a-zA-Z0-9 ]*$')
      ])),
      offerLocation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
     ])),
     description: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(20)
   ])),
     offerFile: new FormControl('', Validators.compose([
      Validators.required
   ])),
   offerType: new FormControl('', Validators.compose([
    Validators.required
 ]))
   });
   this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(this.searchLocaltion.nativeElement,
      {
        componentRestrictions: { country: 'CL' },
        types: ['establishment', 'geocode']  // 'establishment' / 'address' / 'geocode'
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.getLatitudeLongitude(place);
        this.getAddressInformation(place);
        this.getAdditionalInformation(place);
    });
  }

  createOffer(data){
    this.offerRequest.offerTitle = data.offerTitle;
    this.offerRequest.description = data.description;
    this.offerRequest.offerType = data.offerType;
    this.offerRequest.offerLatitude = this.coordinates.latitude;
    this.offerRequest.offerLongitude = this.coordinates.longitude;
    this.offerRequest.district = this.address.cityName;
    this.offerRequest.fileName = this.fileUpload[0].name;
    this.offerRequest.fileExtension = this.fileUpload[0].type;
    this.offerRequest.file = this.fileEncoded;
    if(this.fileUpload[0].type == 'image/jpeg' || this.fileUpload[0].type == 'image/jpg' || this.fileUpload[0].type == 'image/png'){
      this.showErrorUploadFile = false;
      this.offerService.createOffer(this.offerRequest).subscribe((data) => {
        this.router.navigate(['']);
      },error=>{
        console.log(error);
      })
    }else{
      this.showErrorUploadFile = true;
    }
  }

  getLatitudeLongitude(place:any){
    console.log("latitud -> " + place.geometry.location.lat());
    console.log("longitud -> " + place.geometry.location.lng());
    this.coordinates.latitude = place.geometry.location.lat();
    this.coordinates.longitude = place.geometry.location.lng();
  }

  getAddressInformation(place: any){
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (addressType == 'street_number') {
        console.log('street numer -> ' + place.address_components[i].long_name)
        this.address.streetNumber = place.address_components[i].long_name
      }else if (addressType == 'route') {
        console.log('street name -> ' + place.address_components[i].long_name)
        this.address.streetName = place.address_components[i].long_name
      }else if (addressType == 'locality') {
        console.log('locality -> ' + place.address_components[i].long_name)
        this.address.cityName = place.address_components[i].long_name
      }else if (addressType == 'administrative_area_level_1') {
        console.log('administrative_area_level_1 -> ' + place.address_components[i].long_name)
        this.address.regionName = place.address_components[i].long_name
      }else if (addressType == 'country') {
        console.log('country name -> ' + place.address_components[i].long_name)
        this.address.countryName = place.address_components[i].long_name
      }
    }
  }

  getAdditionalInformation(place: any){
    console.log('place id -> ', place.place_id);
    console.log('reference -> ', place.reference);
    console.log('url -> ', place.url);
  }

  async uploadFile(file: File) {
    this.fileUpload = file;
    this.fileName = this.fileUpload[0].name;
    const result = await this.toBase64(this.fileUpload[0]);
    this.fileEncoded = result.toString();
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.toString().replace('data:', '')
    .replace(/^.+,/, ''));
    reader.onerror = error => reject(error);
  });
}
