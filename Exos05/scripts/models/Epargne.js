import { Compte } from "./compte.js";

export class Epargne extends Compte{

    //Attributs
    #dateDernierRetrait

    //Constructeur
    constructor(numero, solde, titulaire, date = undefined){
        super(numero,solde,titulaire);
        this.#dateDernierRetrait = date;
    }

    //Propriétés
    get DateDeRetrait(){
        return this.#dateDernierRetrait;
    }

    //Méthodes
    retrait(montant){
        super.retrait(montant)
        this.#dateDernierRetrait = new Date();
    }
}