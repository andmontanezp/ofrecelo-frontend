import { Offer } from './model/Offer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { 
    
  }

  getOffers(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>("http://localhost:8080/offer");
  }
}
