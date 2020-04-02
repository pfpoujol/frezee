import {Injectable} from '@angular/core';
import {Produit} from './models/Produit';
import {HttpClient} from '@angular/common/http';
import {OpenFoodFact} from './models/OpenFoodFact';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProduitsService {

    constructor(private http: HttpClient) {
    }

    getProduitOpenFoodFacts(code: string): Observable<OpenFoodFact> {
        const url = 'https://fr.openfoodfacts.org/api/v0/product/' + code + '.json';
        return this.http.get<OpenFoodFact>(url);
    }

    addProduitBDD(produit: Produit) {
        // TODO
    }
}
