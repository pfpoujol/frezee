import {Component} from '@angular/core';
import {Produit} from '../models/Produit';
import {ProduitsService} from '../produits.service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {OpenFoodFact} from '../models/OpenFoodFact';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage {
    myProducts: Array<Produit> = [];

    constructor(private produitsService: ProduitsService, private barcodeScanner: BarcodeScanner, private alertController: AlertController,
                private storage: Storage) {
        storage.get('produits').then((val) => {
            this.myProducts = val ? val : [];
        });
    }

    scanCode() {
        this.barcodeScanner
            .scan()
            .then(barcodeData => {
                if (!barcodeData.cancelled) {
                    if (barcodeData.format === 'EAN_13' && barcodeData.text !== '') {
                        this.getScannedProduct(barcodeData.text);
                    } else if (barcodeData.text === '') {
                        alert('Code-bar ilisible.');
                    } else {
                        alert('Seul le format de code-bar EAN_13 est supporté.');
                    }
                }
            })
            .catch(err => {
                console.log('Error', err);
                this.getScannedProduct('3257971309114');
                // this.getScannedProduct('3760239183086');
            });
    }

    getScannedProduct(code: string) {
        this.produitsService.getProduitOpenFoodFacts(code).subscribe((data: OpenFoodFact) => {
            console.log(data);
            if (data.status === 1) {
                const newProduct = {
                    code: data.code,
                    brands : data.product.brands,
                    produitName: data.product.product_name_fr,
                    category: data.product.categories.replace(/, .*/, ''),
                    qty: 1,
                    limitDate: undefined
                } as Produit;
                this.presentAlertPrompt(newProduct);
            } else if (data.status === 0) {
                console.log('produit introuvable');
            }
        });
    }

    async presentAlertPrompt(product: Produit) {
        const alert = await this.alertController.create({
            subHeader: 'Ajouter une date limite et la quantité ?',
            inputs: [
                {
                    name: 'limitDate',
                    type: 'date',
                    min: moment().format('YYYY-MM-DD'),
                    placeholder: 'Date limite'
                },
                {
                    name: 'qty',
                    type: 'number',
                    min: 1,
                    placeholder: 'Quantité'
                }
            ],
            buttons: [
                {
                    text: 'Pas besoin',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('annuler');
                    }
                }, {
                    text: 'Valider',
                    handler: (data) => {
                        if (data.limitDate && moment(data.limitDate).isSameOrAfter()) {
                            product.limitDate = data.limitDate;
                        }
                        if (data.qty) {
                            product.qty = data.qty;
                        }
                        this.myProducts.push(product);
                        this.updateStorage();
                    }
                }
            ]
        });

        await alert.present();
    }

    removeOne(i: number) {
        this.myProducts[i].qty--;
        if (this.myProducts[i].qty === 0) {
            this.myProducts.splice(i, 1);
        }
        this.updateStorage();
    }

    addOne(i: number) {
        this.myProducts[i].qty++;
        this.updateStorage();
    }
    private updateStorage() {
        this.storage.set('produits', this.myProducts);
    }

    hasExpired(limitDate: Date) {
        return moment(limitDate).isSameOrBefore();
    }
}
