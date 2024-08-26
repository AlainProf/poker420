import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Membre } from './modele/membre';

@Injectable({
  providedIn: 'root'
})
export class PokerService {

  constructor(private http:HttpClient) { }

  creationMembre(membre:Membre)
  {

    let url = "https://localhost:8000/creationMembre";
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


}
