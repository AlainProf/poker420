export class Membre
{
    id:number=0;
    nom="";
    mot_de_passe:string="";
    courriel="";
    jwt="";
}

export class MembreCandidat extends Membre{
    choisi=false;
}