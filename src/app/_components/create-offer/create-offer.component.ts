import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import {ValidatorFn} from '@angular/forms/src/directives/validators';

import { OffersService } from '../../_services/offers.service';
import { Offer } from 'src/app/model/offer';
import { Coordinates } from 'src/app/model/coordinates';
import { Address } from 'src/app/model/address';

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
  offer: Offer = {title: '', coordinates: this.coordinates};
  address: Address = {countryName: '', regionName: '', cityName: '', streetName: '', streetNumber: 0}
  fileUpload: File;
  fileName: string = 'Seleccione un archivo';
  showErrorUploadFile: boolean = false;

  constructor(
    private offerService: OffersService
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
     offerFile: new FormControl('', Validators.compose([
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
    this.offer.title = data.offerTitle;
    this.offer.coordinates = this.coordinates
    if(this.fileUpload[0].type == 'image/jpg' || this.fileUpload[0].type == 'image/jpg' || this.fileUpload[0].type == 'image/png'){
      this.showErrorUploadFile = false;
      this.offerService.createOffer(this.offer).subscribe((data) => {
        alert("Dirección agregada");
      },error=>{
        console.log(error);
      })
    }else{
      this.showErrorUploadFile = true;
    }
  }

  getLatitudeLongitude(place:any){
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
        this.address.cityName = place.address_components[i].long_name
      }
    }
  }

  getAdditionalInformation(place: any){
    console.log('place id -> ', place.place_id);
    console.log('reference -> ', place.reference);
    console.log('url -> ', place.url);
  }

  uploadFile(file: File) {
    this.fileUpload = file;
    this.fileName = this.fileUpload[0].name;
  }
}
