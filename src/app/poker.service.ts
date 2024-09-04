import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Membre, MembreCandidat } from './modele/membre';
import { urlServeur } from '../app/util';

@Injectable({
  providedIn: 'root'
})
export class PokerService {

  constructor(private http:HttpClient) { }

  creationMembre(membre:Membre)
  {
    let url = urlServeur + "/creationMembre";
    const params = new HttpParams
    ( 
      {
        fromObject :
        {
          nom:membre.nom,
          mot_de_passe:membre.mot_de_passe,
          courriel:membre.courriel
        }
    } );

    return this.http.post<number>(url, params); 
  }


  connexion(membre:Membre)
  {
    let url = urlServeur + "/connexion";

    console.log(membre.nom);
    console.log(membre.mot_de_passe);
    const params = new HttpParams
    ( 
      {
        fromObject :
        {
          nom:membre.nom,
          mot_de_passe:membre.mot_de_passe
        }
    } );

    return this.http.post<Membre>(url, params);

  }

  getTousLesMembres()
  {
    let url = urlServeur + "/getTousLesMembres";

    const params = new HttpParams
    ( 
      {
        fromObject :
        {
        }
    } );
   
    return this.http.post<MembreCandidat[]>(url, params);


  }


}
