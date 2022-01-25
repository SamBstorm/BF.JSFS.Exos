import { Personne } from "./Personne.js";

export class Compte{

    //Attributs
    #solde
    #titulaire
    #events

    //constructeur
    constructor(numero, solde, titulaire, limite = 0){
        if(isNaN(solde)) throw new TypeError(`La valeur : ${solde}; n'est pas de type number.`)
        if(solde < -limite) throw new RangeError(`Le solde :${solde}; se doit être supérieur ou égale à la limite de ${limite} : ${credit}.`);
        this.numero = numero;
        this.#solde = solde;
        this.Titulaire = titulaire;
        this.#events = new Map();
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
        let oldSolde = this.Solde;
        if(isNaN(montant)) throw new TypeError('Le montant doit être un nombre');
        if(montant <= 0) throw new RangeError('Le montant doit être supérieur à 0');
        if(montant > this.Solde + limite) throw new RangeError('Le montant ne doit pas excéder le Solde');
        this.#solde -= montant;
        if(this.#solde < 0 && oldSolde >= 0) this.#emit('passageEnNegatif', this);
    }

    appliquerInteret(interet){
        this.#solde += interet;
    }

    on(eventName, func){
        if(typeof func !== typeof function(){}) throw new TypeError('Les événements ne prennent en charge que des fonctions.')
        if(!(this.#events.has(eventName))) this.#events.set(eventName,[]);
        this.#events.get(eventName).push(func);
    }

    subon(eventName, func){
        if(!(this.#events.has(eventName))) throw new Error(`l'événement "${eventName}" n'est pas enregistré.`);
        let index = this.#events.get(eventName).indexOf(func);
        if(index === -1) throw new Error(`La function "${func.name}" n'est pas enregistré dans "${eventName}".`);
        this.#events.get(eventName).splice(index, 1);
    }

    #emit(eventName, data){
        if(!(this.#events.has(eventName))) throw new Error(`l'événement "${eventName}" n'est pas enregistré.`);
        this.#events.get(eventName).forEach(
            func => func(data)
        );
    }
}