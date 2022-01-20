import { Personne } from "./Personne.js";

export class Courant{

    #solde
    #ligneDeCredit
    #titulaire

    constructor(numero, solde, credit, titulaire){
        if(isNaN(solde)) throw new TypeError(`La valeur : ${value}; n'est pas de type number.`);
        this.numero = numero;
        this.LigneDeCredit = credit;
        if(solde < -this.LigneDeCredit) throw new RangeError('Le solde ne peut pas être inférieur à la ligne de crédit');
        this.#solde = solde;
        this.Titulaire = titulaire;
    }
    
    get Solde(){
        return this.#solde;
    }
    
    // set #Solde(value){
    //     if(isNaN(value)) throw new TypeError(`La valeur : ${value}; n'est pas de type number.`);
    //     if(value < -this.LigneDeCredit) throw new RangeError('Le solde ne peut pas être inférieur à la ligne de crédit');
    //     this.#solde = value;
    // }
    
    get LigneDeCredit(){
        return this.#ligneDeCredit;
    }
    
    set LigneDeCredit(value){
        if(isNaN(value)) throw new TypeError(`La valeur : ${value}; n'est pas un nombre.`);
        if(value < 0) throw new RangeError('Ligne de crédit doit toujours être positive');
        this.#ligneDeCredit = value;
    }
    
    get Titulaire(){
        return this.#titulaire;
    }
    
    set Titulaire(value){
        if(value.constructor !== Personne.prototype.constructor) throw new TypeError('Le titulaire se doit d\'être de type Personne');
        this.#titulaire = value;
    }
    
    depot(montant){
        if(montant <= 0) throw new RangeError('Le montant doit être positif.');
        this.#solde += montant;
    }
    
    retrait(montant){
        if(montant <= 0) throw new RangeError('Le montant doit être positif.');
        if(montant > this.Solde + this.LigneDeCredit) throw new RangeError('Le montant doit être inférieur au solde restant.');
        this.#solde -= montant;
    }
}