import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Offer } from '../model/offer';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': ""
  })
};

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  
  latLng = new Subject<google.maps.LatLng>();
  constructor(private _http: HttpClient) { }

  getOffers(): Observable<Array<Offer>> {
    return this._http.get<Array<Offer>>(`${environment.apiUrl}/offer`);
  }

  createOffer(offer: Offer): Observable<Offer>{
    httpOptions.headers = httpOptions.headers.set('Authorization', 'bearer ' + JSON.parse(localStorage.getItem('currentUser')).access_token);
    return this._http.post<Offer>(`${environment.apiUrl}/offer`, offer, httpOptions)
  }
}
