import { NgModule } from '@angular/core';

import { MapComponent } from './_components/map/map.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { CreateOfferComponent } from './_guards/_components/create-offer/create-offer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: MapComponent, canActivate:[AuthGuard]},
  { path: 'offer', component: CreateOfferComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
