import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Membre, MembreCandidat } from '../modele/membre';
import { tr } from '../util';
import { PokerService } from '../poker.service';

@Component({
  selector: 'app-creation-partie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creation-partie.component.html',
  styleUrl: './creation-partie.component.css'
})
export class CreationPartieComponent {
  visible = false;
  tabMembres:MembreCandidat[] = new Array();
  @Output() demarrerPartie: EventEmitter<number[]> = new EventEmitter<number[]>();


  constructor(private pksrv:PokerService)
  {}

  onOuvrirEcranCP(mem:Membre)
  {
    this.visible=true;
    this.pksrv.getTousLesMembres().subscribe(
      { 
        next:
           tabMem =>
           {
              if (tabMem[0].courriel == undefined)  
              {
                 tr("Erreur aucun membre ds la BD", true);

              }
              else
              {
                tr("Nombre de membre:" + tabMem.length);
                this.tabMembres = tabMem;
              }
          },

          error:
            err=>{
              tr("Erreur HHTP, vérifiez le serveur");
            }
      }
    )
  }

  basculeMembre(id:number)
  {
    for(let i=0; i<this.tabMembres.length; i++)
    {
      if (this.tabMembres[i].id === id)
      {
        this.tabMembres
      }
    }

  }

  accepterMembres()
  {
    let tabMembresSelectionnes:number[] = Array();
    let onYVa= true;
    

    for(let i=0; this.tabMembres.length; i++)
    {
      if (this.tabMembres[i].choisi)
      {
        tabMembresSelectionnes.push(this.tabMembres[i].id);
      }
    }

    if (tabMembresSelectionnes.length > 10)
    {
      tr("Erreur 10 membres maximum");
      onYVa = false;
    }
    if (tabMembresSelectionnes.length <1 )
      {
        tr("Erreur 1 membres minimum");
        onYVa = false;
      }

      if (onYVa)
      {
        this.visible=false;
        this.demarrerPartie.emit(tabMembresSelectionnes);
      }

  }

  quitter()
  {

  }
}
