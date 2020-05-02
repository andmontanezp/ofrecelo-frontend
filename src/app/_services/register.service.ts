import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class RegisterService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  register(name: string, lastName: string, email: string,password: string) {
    console.log('url:' + `${environment.apiUrl}/user/create`);
    let body = {name : name,
    lastName:lastName,
    email:email,
    password:password};
    console.log("Body: "+body);

    return this._http.post<any>(`${environment.apiUrl}/user/create`, body, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }

}
