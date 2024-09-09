import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tr } from '../util';
import { PokerService } from '../poker.service';
import { Membre, MembreCandidat } from '../modele/membre';
import { InfoPartie } from '../modele/InfoPartie';

@Component({
  selector: 'app-table-de-jeu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-de-jeu.component.html',
  styleUrl: './table-de-jeu.component.css'
})
export class TableDeJeuComponent {
  visible=false;
  membreConnecte = new Membre();
  infoPartie = new InfoPartie();
  tabNomJoueurs:MembreCandidat[] = new Array();

  @Output() quitterTJ=new EventEmitter<Membre>();

  constructor(private pokSrv:PokerService){}

  onDemarrerPartie(eventData: {arg1:number[], arg2:Membre} )
  {
    this.visible=true;
    this.membreConnecte = eventData.arg2;

    tr("Début de partie");

    this.pokSrv.creationPartie(eventData.arg1).subscribe(
      {
         next:
           infoPartie =>
           {
              tr("Communication OK");
              this.infoPartie = infoPartie;

              tr(this.infoPartie.joueurs[0].nom, true);
              //this.tabNomJoueurs = tabJoueurs;
           },
           error:
           err=> {
            tr("Erreur HTTP 32");
           }
      }
    )

  }

  quitter()
  {
    this.visible = false;
    this.quitterTJ.emit(this.membreConnecte);
  }

}
