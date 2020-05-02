import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { MapComponent } from './_components/map/map.component';
import { RegisterComponent } from './_components/register/register.component';
import { AlertComponent } from './_components/alert/alert.component';
import { CreateOfferComponent } from './_components/create-offer/create-offer.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    RegisterComponent,
    AlertComponent,
    CreateOfferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
