import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Product } from '@app/products/models/product.model';
import { FavouriteService, ProductService } from '@app/products/services/';
import { Store } from '@ngrx/store';
import { ProductState } from '@app/products/product.reducer';
import * as selectors from '@app/products/products.selectors';
import { deleteProduct } from '@app/products/product.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;
  productSub: Subscription;

  @ViewChild('dialog', { static: false }) dialogTemplate: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private favouriteService: FavouriteService,
    private store: Store<ProductState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  confirmDeleteProduct(id: number) {
    let dialogRef = this.dialog.open(this.dialogTemplate);
    dialogRef.afterClosed().subscribe(deleteConfirmed => {
      if (deleteConfirmed) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: number) {
    this
      .store
      .dispatch(
        deleteProduct({ id })
      )
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

  ngOnInit() {
    this.product$ = this.store.select(selectors.selectCurrentProduct)
  }

  goToList(): void {
    this.router.navigateByUrl("/products");
  }

  ConfirmAndLog(message: string): void {
    this.snackBar.open(message, 'ok', {
      duration: 1200,
    });
    console.log(message);
  }

}
