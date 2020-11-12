import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { ProductService } from '@app/products/services/';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  insertForm: FormGroup;
  name: FormControl;
  price: FormControl;
  description: FormControl;
  imageUrl: FormControl;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  onSubmit() {
    let newProduct = this.insertForm.value;
    this.productService
      .insertProduct(newProduct)
      .subscribe(
        product => {
          this.ConfirmAndLog(`Product ${product.name} saved.`);
          this.productService.resetList();
          this.router.navigateByUrl("/products");
        },
        error => this.ConfirmAndLog('Could not delete product. ' + error)
      );
  }

  ngOnInit() {
    let validImgUrlRegex: string = '^(https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$';

    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000000)]);
    this.description = new FormControl('', [Validators.minLength(3), Validators.maxLength(500)]);
    this.imageUrl = new FormControl('', [Validators.pattern(validImgUrlRegex)]);

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
