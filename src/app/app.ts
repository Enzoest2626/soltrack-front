import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthPageComponent } from "./pages/authentication/authentication-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'soltrack-front';
}
