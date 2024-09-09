import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membre } from '../modele/membre';
import { tr } from '../util';
import { PokerService } from '../poker.service';



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
  tabIdsParties:number[] = new Array();
  @Output() ouvrirEcranCP = new EventEmitter<Membre>();

  constructor(private pkrSvr:PokerService){}

  ouvrirAccueil(mem:Membre )
  {
    this.membre = mem
    tr(this.membre.nom);
    this.visible=true;

    this.pkrSvr.getPartiesDUnMembre(this.membre.id).subscribe(
      {
        next:
          tabIdP => {
            this.tabIdsParties = tabIdP;

          tr("OK");
        },
        error:
          err=>
        {
          tr("ko hhtp");
        }
      }
    )

    

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
