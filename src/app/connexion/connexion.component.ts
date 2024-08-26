import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  @Output() ouvrirCreationCompte = new EventEmitter<any>();

  visible:boolean = true;

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
}
