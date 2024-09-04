export class Membre
{
    id:number=0;
    nom="";
    mot_de_passe:string="";
    courriel="";
}

export class MembreCandidat extends Membre{
    choisi=false;
}