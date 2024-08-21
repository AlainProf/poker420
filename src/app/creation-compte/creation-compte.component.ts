import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creation-compte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creation-compte.component.html',
  styleUrl: './creation-compte.component.css'
})
export class CreationCompteComponent {
  visible=false;
  onOuvrirCreationCompte()
  {
    //alert("ouverture de CC");
    this.visible=true;
  }
}
