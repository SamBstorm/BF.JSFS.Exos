import { Personne } from "./Personne.js";

export class Courant{
    constructor(numero, solde, credit, titulaire){
        if(credit < 0 || isNaN(credit)) throw new RangeError('Ligne de crédit doit toujours être positive');
        if(solde < -credit || isNaN(solde)) throw new RangeError('Le solde ne peut pas être inférieur à la ligne de crédit');
        if(titulaire.constructor !== Personne.prototype.constructor) throw new TypeError('Le titulaire se doit d\'être de type Personne');
        this.numero = numero;
        this.solde = solde;
        this.ligneDeCredit = credit;
        this.titulaire = titulaire;
    }

    depot(montant){
        if(montant <= 0) throw new RangeError('Le montant doit être positif.');
        this.solde += montant;
    }
    
    retrait(montant){
        if(montant <= 0) throw new RangeError('Le montant doit être positif.');
        if(montant > this.solde + this.ligneDeCredit) throw new RangeError('Le montant doit être inférieur au solde restant.');
        this.solde -= montant;
    }
}