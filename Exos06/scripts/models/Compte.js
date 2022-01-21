import { Personne } from "./Personne.js";

export class Compte{

    //Attributs
    #solde
    #titulaire

    //constructeur
    constructor(numero, solde, titulaire, limite = 0){
        if(isNaN(solde)) throw new TypeError(`La valeur : ${solde}; n'est pas de type number.`)
        if(solde < -limite) throw new RangeError(`Le solde :${solde}; se doit être supérieur ou égale à la limite de ${limite} : ${credit}.`);
        this.numero = numero;
        this.#solde = solde;
        this.Titulaire = titulaire;
    }

    //Propriétés
    get Solde(){
        return this.#solde;
    }

    get Titulaire(){
        return this.#titulaire;
    }

    set Titulaire(value){
        if(value.constructor !== Personne.prototype.constructor) throw new TypeError('Le titulaire se doit d\'être de type Personne');
        this.#titulaire = value;
    }

    //Méthodes
    depot(montant){
        if(isNaN(montant)) throw new TypeError('Le montant doit être un nombre');
        if(montant <= 0) throw new RangeError('Le montant doit être supérieur à 0');
        this.#solde += montant;
    }

    retrait(montant, limite = 0){
        if(isNaN(montant)) throw new TypeError('Le montant doit être un nombre');
        if(montant <= 0) throw new RangeError('Le montant doit être supérieur à 0');
        if(montant > this.Solde + limite) throw new RangeError('Le montant ne doit pas excéder le Solde');
        this.#solde -= montant;
    }

    appliquerInteret(interet){
        this.#solde += interet;
    }
}