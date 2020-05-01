import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'

import { OffersService } from '../../_services/offers.service';
import { Offer } from 'src/app/model/offer';
import { Coordinates } from 'src/app/model/coordinates';

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
  offer: Offer;
  coordinates: Coordinates;

  constructor(
    private offerService: OffersService
  ) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      offerTitle: new FormControl('', Validators.compose([
         Validators.required,
         Validators.minLength(6),
         Validators.pattern('^[a-zA-Z]+$')
      ])),
      offerLocation: new FormControl('')
   });
   this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(this.searchLocaltion.nativeElement,
      {
        componentRestrictions: { country: 'CL' },
        types: ['establishment','address', 'geocode']  // 'establishment' / 'address' / 'geocode'
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        console.log(place);
    });
  }

  createOffer(data){
    console.log(data);
    this.offer.title = data.offerTitle;
    this.coordinates.latitude = 0;
    this.coordinates.longitude = 0;
    this.offer.coordinates = this.coordinates
    this.offerService.createOffer(this.offer).subscribe((data) => {
      alert("Dirección agregada");
    },error=>{
      console.log(error);
    })
  }

}
