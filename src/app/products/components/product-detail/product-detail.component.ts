import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { Product } from '@app/products/models/product.model';
import { FavouriteService } from '@app/products/services/';
import { Store } from '@ngrx/store';
import { ProductState } from '@app/products/product.reducer';
import * as selectors from '@app/products/products.selectors';
import { deleteProduct } from '@app/products/product.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  @ViewChild('dialog') dialogTemplate: TemplateRef<any>;

  constructor(
    private snackBar: MatSnackBar,
    private favouriteService: FavouriteService,
    private store: Store<ProductState>,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.product$ = this.store.select(selectors.selectCurrentProduct)
  }

  deleteProduct(id: number) {
    this
      .store
      .dispatch(
        deleteProduct({ id })
      )


    // BEFORE NGRX
    //
    // this.productService
    //   .deleteProduct(id)
    //   .subscribe(
    //     () => {
    //       this.ConfirmAndLog('Product deleted.');
    //       this.productService.resetList();
    //       this.router.navigateByUrl("/products");
    //     },
    //     error => this.ConfirmAndLog('Could not delete product. ' + error)
    //   );
  }

  addToFavourites(product: Product) {
    let favouriteAdded = this.favouriteService.addToFavourites(product);
    if (favouriteAdded) {
      this.ConfirmAndLog('Product added to your favourites.');
      this.router.navigateByUrl("/products");
    } else {
      this.ConfirmAndLog('Product already in your favourites.');
    }
  }

  ConfirmAndLog(message: string): void {
    this.snackBar.open(message, 'ok', {
      duration: 1200,
    });
    console.log(message);
  }

  confirmDeleteProduct(id: number) {
    let dialogRef = this.dialog.open(this.dialogTemplate);
    dialogRef.afterClosed().subscribe(deleteConfirmed => {
      if (deleteConfirmed) {
        this.deleteProduct(id);
      }
    });
  }

}
