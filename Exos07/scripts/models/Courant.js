import { Compte } from "./compte.js";

export class Courant extends Compte{

    //Attributs
    #ligneDeCredit

    //Constructeur
    constructor(numero, solde, credit, titulaire){        
        super(numero, solde, titulaire, credit);
        this.LigneDeCredit = credit;
    }
    
    //Propriétés
    get LigneDeCredit(){
        return this.#ligneDeCredit;
    }
    
    set LigneDeCredit(value){
        if(isNaN(value)) throw new TypeError(`La valeur : ${value}; n'est pas un nombre.`);
        if(value < 0) throw new RangeError('Ligne de crédit doit toujours être positive');
        this.#ligneDeCredit = value;
    }
    
    //Méthodes
    retrait(montant){
        super.retrait(montant, this.LigneDeCredit);
    }

    appliquerInteret(){
        let interet = (this.Solde > 0)? this.Solde * 0.015 : this.Solde * 0.04;
        super.appliquerInteret(interet);
    }
}