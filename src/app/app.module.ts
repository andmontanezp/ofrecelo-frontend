import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule }    from '@angular/forms';
import {MatCardModule, MatButtonModule, MatGridListModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { MapComponent } from './_components/map/map.component';
import { RegisterComponent } from './_components/register/register.component';
import { ResetPasswordComponent } from './_components/reset password/reset-password.component';
import { AlertComponent } from './_components/alert/alert.component';
import { CreateOfferComponent } from './_components/create-offer/create-offer.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { FormsModule }   from '@angular/forms';
import { OfferCardListComponent } from './_components/offer-list/offer-card-list.component';
import { OfferCardComponent } from './_components/offer/offer.card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './_components/base-layout/base-layout.component';
import { OfferListMobileComponent } from './_components/offer-list-mobile/offer-list-mobile.component';
import { MapMobileComponent } from './_components/map-mobile/map-mobile.component';
import { LoadingComponent } from './_components/loading/loading.component';
import { NavbarComponent } from './_components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    RegisterComponent,
    ResetPasswordComponent,
    AlertComponent,
    CreateOfferComponent,
    OfferCardListComponent,
    OfferCardComponent,
    BaseLayoutComponent,
    OfferListMobileComponent,
    MapMobileComponent,
    LoadingComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule, 
    MatButtonModule, 
    MatGridListModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
