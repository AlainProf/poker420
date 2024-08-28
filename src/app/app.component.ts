import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { CreationCompteComponent } from './creation-compte/creation-compte.component';
import { AccueilComponent } from './accueil/accueil.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConnexionComponent, CreationCompteComponent, AccueilComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poker 420';
}
