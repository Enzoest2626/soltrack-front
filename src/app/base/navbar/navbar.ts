import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  urlParams = new URLSearchParams(window.location.search);
  role: string = (this.urlParams.get("role") || "cliente").toUpperCase();

  constructor() {
  }

}
