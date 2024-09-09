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
  membreConnecte = new Membre();
  tabMembres:MembreCandidat[] = new Array();

  @Output() demarrerPartie = new EventEmitter<{arg1:number[], arg2:Membre}>();


  constructor(private pksrv:PokerService)
  {}

  onOuvrirEcranCP(mem:Membre)
  {
    this.visible=true;
    this.membreConnecte = mem;
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
        this.tabMembres[i].choisi = !this.tabMembres[i].choisi;
      }
    }

  }

  accepterMembres()
  {
    let tabMembresSelectionnes:number[] = [0,0,0,0,0,0,0,0,0,0];
    let nbMembres = 0;
    let onYVa= true;
   
    for(let i=0; i<this.tabMembres.length; i++)
    {
      if (this.tabMembres[i].choisi)
      {
        if (nbMembres == 10)
        {
            nbMembres++;
            break;
        }
        tabMembresSelectionnes.push(this.tabMembres[i].id);
        nbMembres++;
      }
    }

    if (nbMembres > 10)
    {
      tr("Erreur 10 membres maximum");
      onYVa = false;
    }
    if (nbMembres < 2 )
    {
       tr("Erreur 2 membres minimum");
       onYVa = false;
    }

    if (onYVa)
    {
       this.visible=false;
       this.demarrerPartie.emit({arg1:tabMembresSelectionnes, arg2:this.membreConnecte});
    }

  }

  quitter()
  {

  }
}
