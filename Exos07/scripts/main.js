import { Personne } from './models/Personne.js';
import { Courant } from './models/Courant.js';
import { Banque } from './models/Banque.js';
import { Epargne } from './models/Epargne.js';

let user = new Personne("Willis","Bruce",new Date(1967,7,15));
let compte = new Courant('BE01',50000, 400, user);

console.log(compte);
compte.retrait(5000);

console.log(compte);

let toto = new Personne('Toto','Le héros', Date.now);

let compte2 = new Courant('BE02',-100,100,toto);
let compte3 = new Courant('BE03',1000,0,toto);
let compte4 = new Courant('BE04',100,50,toto);
console.log(compte2);

let bank = new Banque("DonnerSansCompter",compte,compte4);
//bank.ajouterCompte(compte);
//Ajout de 2 fois le même compte contré
//bank.ajouterCompte(compte);
bank.ajouterCompte(compte2);
bank.ajouterCompte(compte3);
//bank.ajouterCompte(compte4);

console.log(bank.compte("BE01"));
compte.retrait(45400);
console.log(bank.compte("BE01"));
console.log(bank);
console.log(bank.avoirDesComptes(toto));
let toto2 = bank.compte('BE03').Titulaire;
console.log(bank.avoirDesComptes(toto2));

let ep_compte = new Epargne('BE91', 200, toto);

let ep_compte1 = new Epargne('BE92', 100, toto, new Date(1987,8,27));

console.log(ep_compte)
console.log(ep_compte1)

ep_compte.retrait(50)
console.log(ep_compte)

bank.ajouterCompte(ep_compte);
bank.ajouterCompte(ep_compte1);

console.log(bank);
bank.calculDesInterets();
console.log(compte);
console.log(compte2);
console.log(compte3);
console.log(compte4);
console.log(ep_compte);
console.log(ep_compte1);

bank.retirerCompte("BE04");
console.log(bank);
compte4.retrait(150);
console.log(compte4);

compte4.on('passageEnNegatif', 'toto');
