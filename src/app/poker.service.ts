import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Membre, MembreCandidat } from './modele/membre';
import { urlServeur } from '../app/util';
import { InfoPartie } from './modele/InfoPartie';

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



  creationPartie(tabIdJ:number[])
  {
    let url = urlServeur + "/creationPartie";

    const params = new HttpParams
    ( 
      {
        fromObject :
        {
          idJ0 : tabIdJ[0],
          idJ1 : tabIdJ[1],
          idJ2 : tabIdJ[2],
          idJ3 : tabIdJ[3],
          idJ4 : tabIdJ[4],
          idJ5 : tabIdJ[5],
          idJ6 : tabIdJ[6],
          idJ7 : tabIdJ[7],
          idJ8 : tabIdJ[8],
          idJ9 : tabIdJ[9],
        }
    } );
   
    return this.http.post<InfoPartie>(url, params);
  }

  getPartiesDUnMembre(id:number)
  {
    let url = urlServeur + "/getPartiesDUnMembre";

    const params = new HttpParams
    ( 
      {
        fromObject :
        {
          idj : id 
        }
    } );
   
    return this.http.post<number[]>(url, params); 
  }


}
