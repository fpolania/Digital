import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreUsuario: String;
  constructor() { 
    this.nombreUsuario = 'Fabian Lasso'
  }

  ngOnInit(): void {
  }

}
