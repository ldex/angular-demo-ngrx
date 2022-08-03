import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { ProductState } from '@app/products/product.reducer';
import { addProduct } from '@app/products/product.actions';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  insertForm: UntypedFormGroup;
  name: UntypedFormControl;
  price: UntypedFormControl;
  description: UntypedFormControl;
  imageUrl: UntypedFormControl;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<ProductState>,
    private snackBar: MatSnackBar) { }

  onSubmit() {
    this.store.dispatch(addProduct({product:this.insertForm.value}));


    // BEFORE NGRX
    //
    // this.productService
    //   .insertProduct(newProduct)
    //   .subscribe(
    //     product => {
    //       this.ConfirmAndLog(`Product ${product.name} saved.`);
    //       this.productService.resetList();
    //       this.router.navigateByUrl("/products");
    //     },
    //     error => this.ConfirmAndLog('Could not delete product. ' + error)
    //   );
  }

  ngOnInit() {
    let validImgUrlRegex: string = '^(https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$';

    this.name = new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]);
    this.price = new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(10000000)]);
    this.description = new UntypedFormControl('', [Validators.minLength(3), Validators.maxLength(500)]);
    this.imageUrl = new UntypedFormControl('', [Validators.pattern(validImgUrlRegex)]);

    this.insertForm = this.fb.group(
      {
        'name': this.name,
        'price': this.price,
        'description': this.description,
        'imageUrl': this.imageUrl,
        'discontinued': false,
        'fixedPrice': false
      }
    );
  }

  ConfirmAndLog(message: string): void {
    this.snackBar.open(message, 'ok', {
      duration: 1200,
    });
    console.log(message);
  }

}
