import { NgModule } from '@angular/core';

import { MapComponent } from './_components/map/map.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { ResetPasswordComponent } from './_components/reset password/reset-password.component';
import { EditOfferCardListComponent } from './_components/edit-offers/edit-offer-card-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { CreateOfferComponent } from './_components/create-offer/create-offer.component';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './_components/base-layout/base-layout.component';
import { AboutUsComponent } from './_components/about-us/about-us.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'restpassword', component: ResetPasswordComponent },
  { path: 'editOffers', component: EditOfferCardListComponent },
  { path: 'aboutUs', component: AboutUsComponent},
  { 
    path: '', 
    component: BaseLayoutComponent, 
    children: [{
      path: '',
      component: MapComponent
    }],
    canActivate:[AuthGuard]},
  { path: 'offer', component: CreateOfferComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
