import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokerService } from '../poker.service';
import { Membre } from '../modele/membre';


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

  membre:Membre=new Membre();

  visible:boolean = true;

  constructor(private poksrv:PokerService)
  {}

  OuvrirCreationCompte()
  {
    this.visible = false;
    //alert("Click sur créer compte");
    this.ouvrirCreationCompte.emit();
  }

  onQuitterCreationCompte()
  {
    this.visible=true;
  }

  validerConnexion()
  {
    let ok=false;
    //alert("Nom:" + this.membre.nom);

    if (this.membre.nom.length > 1)
    {
      if (this.membre.motDePasse.length > 1)
      {
        this.poksrv.connexion(this.membre).subscribe(
        
          mem => {

            this.membre= mem;
            alert("Courriel connecté:" + this.membre.courriel);


            ok = true;



            this.connexionReussie.emit(this.membre);

/*          if (mem == "-1")
           {
                alert("Connexion réussie");
                alert(mem);
            }
            else
            {
              alert("Echec de la Connexion");
            }*/



          }
      );
      }
    }
  }
}
