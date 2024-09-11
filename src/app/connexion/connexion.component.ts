import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokerService } from '../poker.service';
import { Membre } from '../modele/membre';
import { tr } from '../util';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  @Output() ouvrirCreationCompte = new EventEmitter<any>();
  @Output() connexionReussie = new EventEmitter<Membre>();

  membre: Membre = new Membre();

  visible: boolean = true;

  constructor(private poksrv: PokerService) { }

  OuvrirCreationCompte() {
    this.visible = false;
    //alert("Click sur créer compte");
    this.ouvrirCreationCompte.emit();
  }

  onQuitterCreationCompte() {
    this.visible = true;
  }

  validerConnexion() {

    this.triche();
    let ok = false;
    //alert("Nom:" + this.membre.nom);

    if (this.membre.nom.length > 1) {
      if (this.membre.mot_de_passe.length > 1) {
        this.poksrv.connexion(this.membre).subscribe(
          {
            next:
              mem => {
                tr("Communication avec serveur OK!");
                if (mem.courriel == undefined)
                {
                   alert("mauvais logon");
                }
                else
                {
                  tr("Membre bien connecté:" + this.membre.nom);
                  this.membre = mem; 
                  tr("jwt de " + mem.nom + ":" + mem.jwt);
                  this.visible = false;
                 
                  this.connexionReussie.emit(this.membre);
                  
                }
              },
            error:
              err => {
                alert("Erreur HHTP, vérifiez le serveur");
              }
          }
        );
      }
    }
  }

  triche()
  {
    if (this.membre.nom.length == 0)
    {
      this.membre.nom="ben";
      this.membre.mot_de_passe = "11";
    }
  }
}
