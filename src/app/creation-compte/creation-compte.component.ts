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
  visible = false;
  membreCandidat: Membre = new Membre();
  confirmation = "";

  @Output() quitterCreationCompte = new EventEmitter<any>();

  constructor(private poksrv: PokerService) { }

  valider() 
  {
    let valide = false;
    if (this.membreCandidat.nom.length > 1) {
      if (this.membreCandidat.courriel.length > 5) {
        if (this.membreCandidat.motDePasse.length > 1) {
          if (this.membreCandidat.motDePasse == this.confirmation) {
            valide = true;
            this.poksrv.creationMembre(this.membreCandidat).subscribe(
              id  => {
                this.membreCandidat.id = id;
                alert("Le membre " + this.membreCandidat.nom + " a été créé avec l'id " + this.membreCandidat.id);
              })
          }
        }
      }
    }

    if (!valide)
      alert("Une erreur est survenue");
  }




quitter()
{
  this.visible = false;
  this.quitterCreationCompte.emit();

}

onOuvrirCreationCompte()
{
  //alert("ouverture de CC");
  this.visible = true;
}
}
