import { Personne } from './models/Personne.js';
import { Courant } from './models/Courant.js';

let user = new Personne("Willis","Bruce",new Date(1967,7,15));
let compte = new Courant('BE01',50000, 400, user);

console.log(compte);
compte.retrait(5000);

console.log(compte);

let compte2 = new Courant('BE02',-100,100,new Personne('Toto','Le héros', Date.now));
console.log(compte2);