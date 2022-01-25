import { Compte } from "./Compte.js";
import { Personne } from "./Personne.js";

export class Banque{
    
    #comptes
    #nom
    
    constructor(nom, ...comptes){
        this.#nom = nom;
        this.#comptes = new Map();
        comptes.forEach( c => this.ajouterCompte(c));
    }

    get Nom(){
        return this.#nom;
    }

    set Nom(value){
        this.#nom = value;
    }

    ajouterCompte(compte){
        if(compte instanceof Compte) throw new TypeError('Le paramètre compte doit être de type Compte.');
        if(this.#comptes.has(compte.numero)) throw new RangeError(`Le compte ${compte.numero} est déjà enregistré.`);
        this.#comptes.set(compte.numero, compte);
        compte.on('passageEnNegatif', this.#onNegatif);
    }

    compte(numero){
        if(!this.#comptes.has(numero)) throw new RangeError(`Le compte ${numero} n\'est pas enregistré.`);
        return this.#comptes.get(numero);
    }

    avoirDesComptes(titulaire){
        if(titulaire.constructor !== Personne.prototype.constructor) throw new TypeError('Le paramètre titulaire doit être de type Personne.');
        let sommeDesAvoirs = 0;
        // for (const [key, value] of this.#comptes) {
        //     if(value.Titulaire === titulaire && value.Solde > 0) sommeDesAvoirs += value.Solde;
        // }
        for (const compte of this.#comptes.values()) {
            if(compte.Titulaire === titulaire && compte.Solde > 0) sommeDesAvoirs += compte.Solde;
        }
        return sommeDesAvoirs;
    }

    calculDesInterets(){
        for (const compte of this.#comptes.values()) {
            compte.appliquerInteret();
        }
    }

    retirerCompte(numero){
        if(!(this.#comptes.has(numero))) throw new Error(`Le compte ${numero} ne fait pas partie de notre banque.`);
        this.#comptes.get(numero).subon('passageEnNegatif',this.#onNegatif);
        this.#comptes.delete(numero);
    }

    #onNegatif(compte){
        alert(`Le compte ${compte.numero} est passé en négatif : ${compte.Solde}.`)
    }
}