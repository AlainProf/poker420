import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Membre } from '../modele/membre';
import { PokerService } from '../poker.service';


@Component({
  selector: 'app-creation-compte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creation-compte.component.html',
  styleUrl: './creation-compte.component.css'
})
export class CreationCompteComponent {
  visible=false;
  membreCandidat:Membre = new Membre();

  @Output() quitterCreationCompte = new EventEmitter<any>();

  constructor(private poksrv:PokerService){}

  valider()
  {
    //alert("nom désiré:" + this.membreCandidat.nom);

    this.poksrv.creationMembre(this.membreCandidat).subscribe(
       msg => {
        alert("id du nouveau membre :" + msg);
       } 
    )
  }


  quitter()
  {
    this.visible = false;
    this.quitterCreationCompte.emit();

  }

  onOuvrirCreationCompte()
  {
    //alert("ouverture de CC");
    this.visible=true;
  }
}
