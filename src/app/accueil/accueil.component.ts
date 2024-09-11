import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membre } from '../modele/membre';
import { tr, urlServeur, MAX_FICHIER_VOLUME } from '../util';
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
  urlServeur = urlServeur;
  @Output() ouvrirEcranCP = new EventEmitter<Membre>();
  @Output() ouvrirP = new EventEmitter<{arg1:number, arg2:Membre}>();

  fichierATeleverser:any;
  formData = new FormData();
  file:any;
  file_data:any='';
  televersementValide:boolean = false;

  constructor(private pkrSvr:PokerService){}

  ouvrirAccueil(mem:Membre )
  {
    this.membre = mem
    tr(this.membre.nom);
    this.visible=true;

    this.pkrSvr.getPartiesDUnMembre(this.membre).subscribe(
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
  tr(this.urlServeur + "/images/joueurs/joueurs0.png");
   }


  ouvrirEcranCreationPartie()
  {
    tr("Ouvrir c p");
    this.visible=false;
    this.ouvrirEcranCP.emit(this.membre);
  }

  quitter() {  }

  ouvrirPartie(idP:number)
  {
    this.visible = false;
    this.ouvrirP.emit({arg1:idP, arg2:this.membre});
  }

//------------------------------------
//
//------------------------------------
executerTeleversement()
{
  //tr("On procède au téléversement!");
  if (this.fichierATeleverser) 
  {
      this.pkrSvr.televerseFichier(this.file_data).subscribe( 
        res  => {
          tr("Téléversement terminé:" + res);
          this.televersementValide = false;
        }
      );
  }
  else
  {
    tr("ERREUR: Le fichier à téléverser est vide");
  }
}

//------------------------------------
//
//------------------------------------
fileChange(event:any)
{
  const fileList: FileList = event.target.files;
  if (fileList.length > 0){
    this.fichierATeleverser = fileList[0];
    tr(this.fichierATeleverser.name + " dim:" + 
       this.fichierATeleverser.size + " type:" + 
       this.fichierATeleverser.type);

    if ( this.validerFichier() )
    {
      let formData = new FormData();
      formData.append('file', this.fichierATeleverser, this.fichierATeleverser.name);
      formData.append('joueurId', "" + this.membre.id);
      formData.append('extension', "" +  this.extraitExtension(this.fichierATeleverser.name));

      //formData.append('acces', this.membre.jwt);
      
      this.file_data=formData;
      this.televersementValide = true;
    }
  }
}

 //------------------------------------
  //
  //------------------------------------   
  validerFichier()
  {
    let ret = false;
    if (this.fichierATeleverser.size <= MAX_FICHIER_VOLUME)
    {
       let extension = this.extraitExtension(this.fichierATeleverser.name);
       if (extension?.toLowerCase() == 'png')
       {
          ret = true;
       }
       if (!ret)   
          tr("Erreur: extension de fichier non-supportée", true)
    }
    else
    {
      ret = false;
      tr("Erreur: Fichier trop volumineux. Maximum 500 kB et le fichier a " + (this.fichierATeleverser.size/1024).toFixed(0) + " kB", true, true)
    }
    return ret;
  }

   //------------------------------------
  //
  //------------------------------------   
  extraitExtension(nomFichier:string)
  {
    let extension = nomFichier.split('.').pop();
    tr("l'extension du fichier est " + extension);
    return extension;
  }

}
