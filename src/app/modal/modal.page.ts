import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {range} from 'rxjs';
import {isNull} from 'util';
import {isEmpty} from 'rxjs/operators';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() code: string;
  productForm: FormGroup;
  minDate = moment().format('YYYY-MM-DD');
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      code: new FormControl(this.code),
      brands: new FormControl(undefined),
      produitName: new FormControl(undefined, Validators.required),
      qty: new FormControl(undefined),
      limitDate: new FormControl(undefined)
    });
  }
  closeModal() {
    this.modalController.dismiss();
  }
  validModal() {
    if (this.productForm.valid) {
      const produit = this.productForm.getRawValue();
      if (this.productForm.get('qty').value === null || this.productForm.get('qty').value < 1) {
        produit.qty = 1;
      }
      this.modalController.dismiss(produit);
    }

  }
}
