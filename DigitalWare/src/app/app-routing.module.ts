import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';

const routes: Routes = [
  {
    path: 'resavaciones',
    component: ReservacionesComponent,
    canActivate: []
  },
  
  {
    path: '',
    component: LandingComponent,
    canActivate: [],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
