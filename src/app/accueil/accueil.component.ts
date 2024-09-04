import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membre } from '../modele/membre';
import { tr } from '../util';



@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  visible=false;
  membre:Membre = new Membre();
  @Output() ouvrirEcranCP = new EventEmitter<Membre>();

  ouvrirAccueil(mem:Membre )
  {
    this.membre = mem
    tr(this.membre.nom);
    this.visible=true;
  }


  ouvrirEcranCreationPartie()
  {
    tr("Ouvrir c p");
    this.visible=false;
    this.ouvrirEcranCP.emit(this.membre);

  }

  quitter()
  {

  }
}
