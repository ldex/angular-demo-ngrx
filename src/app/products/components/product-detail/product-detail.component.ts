import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '@app/products/models/product.model';
import { Store } from '@ngrx/store';
import { ProductState } from '@app/products/product.reducer';
import * as selectors from '@app/products/products.selectors';
import { deleteProduct } from '@app/products/product.actions';
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
    private store: Store<ProductState>,
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
    //       console.log('Product deleted.');
    //       this.productService.resetList();
    //       this.router.navigateByUrl("/products");
    //     },
    //     error => console.error('Could not delete product. ' + error)
    //   );
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
