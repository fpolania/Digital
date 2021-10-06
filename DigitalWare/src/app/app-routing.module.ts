import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { ReservarComponent } from './reservar/reservar.component';

const routes: Routes = [
  {
    path: 'resavaciones',
    component: ReservacionesComponent,
    canActivate: []
  },
  {
    path: 'reservar',
    component: ReservarComponent,
    canActivate: []
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [],
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
