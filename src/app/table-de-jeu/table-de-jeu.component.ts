import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tr } from '../util';

@Component({
  selector: 'app-table-de-jeu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-de-jeu.component.html',
  styleUrl: './table-de-jeu.component.css'
})
export class TableDeJeuComponent {
  visible=false;

  onDemarrerPartie(tabIdJoueurs:number[])
  {
    this.visible=true;
    tr("Début de partie");
  }

  quitter()
  {

  }

}
