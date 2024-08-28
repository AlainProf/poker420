import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Membre } from './modele/membre';
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
          motDePasse:membre.motDePasse,
          courriel:membre.courriel
        }
    } );

    return this.http.post<number>(url, params); 
  }


  connexion(membre:Membre)
  {
    let url = urlServeur + "/connexion";

    console.log(membre.nom);
    console.log(membre.motDePasse);
    const params = new HttpParams
    ( 
      {
        fromObject :
        {
          nom:membre.nom,
          motDePasse:membre.motDePasse
        }
    } );

    return this.http.post<Membre>(url, params);

  }


}
