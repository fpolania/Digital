import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './landing/navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservarComponent } from './reservar/reservar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersistenceModule } from 'angular-persistence';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    ReservacionesComponent,
    ReservarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PersistenceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
