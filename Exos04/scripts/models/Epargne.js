import { Personne } from "./Personne.js";

export class Epargne{

    //attributs
    #solde
    #dateDernierRetrait
    #titulaire

    //constructeur
    constructor(numero, solde, titulaire, date = undefined){
        if(isNaN(solde)) throw new TypeError('Le solde doit être un nombre.')
        if(solde < 0) throw new RangeError('Le solde doit être positif.')
        this.numero = numero;
        this.#solde = solde;
        this.Titulaire = titulaire;
        this.#dateDernierRetrait = date;
    }

    //propriétés
    get Solde(){
        return this.#solde;
    }

    get DateDeRetrait(){
        return this.#dateDernierRetrait;
    }

    get Titulaire(){
        return this.#titulaire;
    }

    set Titulaire(value){
        if(value.constructor !== Personne.prototype.constructor) throw new TypeError('Le Titulaire doit être de type Personne.');
        this.#titulaire = value;
    }

    //méthodes

    depot(montant){
        if(isNaN(montant)) throw new TypeError('Le montant doit être un nombre');
        if(montant <= 0) throw new RangeError('Le montant doit être supérieur à 0');
        this.#solde += montant;
    }

    retrait(montant){
        if(isNaN(montant)) throw new TypeError('Le montant doit être un nombre');
        if(montant <= 0) throw new RangeError('Le montant doit être supérieur à 0');
        if(this.Solde < montant) throw new RangeError('Le montant ne doit pas excéder le Solde');
        this.#solde -= montant;
        this.#dateDernierRetrait = new Date();
    }
}