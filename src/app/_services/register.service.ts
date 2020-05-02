import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class RegisterService {


  constructor(private _http: HttpClient) {
  }

  register( user: User): Observable<User> {
    console.log('url:' + `${environment.apiUrl}/user/create`);

    console.log("Body: "+user);

    return this._http.post<any>(`${environment.apiUrl}/user/create`, user, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }

}
