import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private readonly route: Router) { }

  ngOnInit(): void {
  }
  verListaReservaciones(): void {
    this.route.navigate(['/resavaciones']);
  }
  realizarReserva(): void {
    this.route.navigate(['/reservar']);
  }
}
