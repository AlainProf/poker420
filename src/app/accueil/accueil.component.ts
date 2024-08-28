import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membre } from '../modele/membre';


@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  visible=false;

  ouvrirAccueil(mem:Membre )
  {
    alert(mem.nom);
    this.visible=true;
  }

  quitter()
  {

  }
}
