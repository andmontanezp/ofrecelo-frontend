import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Offer } from '../model/offer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(private _http: HttpClient) { }

  getOffers(): Observable<Array<Offer>> {
    return this._http.get<Array<Offer>>(`${environment.apiUrl}/offer`);
  }
}
