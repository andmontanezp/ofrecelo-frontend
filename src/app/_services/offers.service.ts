import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Offer } from '../model/offer';
import { environment } from 'src/environments/environment';
import { OfferDTO } from '../model/offerDTO';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(private _http: HttpClient) { }

  getOffers(): Observable<Array<OfferDTO>> {
    return this._http.get<Array<OfferDTO>>(`${environment.apiUrl}/offer`);
  }

  createOffer(offer: Offer, offerFile: File): Observable<Offer>{
    const formData = new FormData();
    formData.append('offerTitle', offer.title);
    formData.append('offerLatitude', offer.coordinates.latitude.toString());
    formData.append('offerLongitude', offer.coordinates.longitude.toString());
    formData.append('offerFile', offerFile);
    return this._http.post<Offer>(`${environment.apiUrl}/offer`, formData)
  }
}
