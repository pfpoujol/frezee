import { Injectable } from '@angular/core';
import {Produit} from './models/Produit';
import {HttpClient} from '@angular/common/http';
import {OpenFoodFact} from './models/OpenFoodFact';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private http: HttpClient) { }
  getMyProducts(): Array<Produit> {
    // TODO: Ionic storage
    return [
      {
        code: '3272320012231',
        produitName: 'Ortolan Familial',
        qty: 1,
        limitDate: undefined
      },
      {
        code: '3250392615109',
        produitName: 'Tourteau Fromager',
        qty: 2,
        limitDate: undefined
      },
      {
        code: '3272770099318',
        produitName: 'Saint Agur',
        qty: 3,
        limitDate: undefined
      },
      {
        code: '3155251205425',
        produitName: 'Creme Fraiche Epaisse',
        qty: 6,
        limitDate: undefined
      },
      {
        code: '3660603004866',
        produitName: 'Mayonnaise',
        qty: 1,
        limitDate: undefined
      }
    ];
  }

  getProduitBDD(code: string) {
    // TODO
    const url = 'https://fr.openfoodfacts.org/api/v0/product/' + code + '.json';
    return this.http.get<OpenFoodFact>(url);
/*    return {
      code: '3257971309114',
      produitName: 'Eau minérale naturelle - Mont Roucous - 1L',
      qty: 1
    };*/
  }
  addProduitBDD(produit: Produit) {
    // TODO
  }
}
