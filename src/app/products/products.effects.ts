import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { loadProducts, loadProductsSuccess, loadProductsFailure, deleteProduct, deleteProductSuccess, deleteProductFailure, addProductFailure, updateProductFailure, updateProductSuccess, addProduct, addProductSuccess, updateProduct } from './product.actions';
import { ProductService } from './services';
import { Product } from './models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productService.products$.pipe(
          // If successful, dispatch success action with result
          map((products: Product[]) =>
            loadProductsSuccess({ products })
          ),
          // If request fails, dispatch failed action
          catchError(error =>
            of(loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => deleteProductSuccess({ id })),
          catchError(error =>
            of(deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap(({ product }) =>
        this.productService.insertProduct(product).pipe(
          map(product => addProductSuccess({ product })),
          catchError(error =>
            of(addProductFailure({ error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap(({ product }) =>
        this.productService.updateProduct(product.id, product.changes).pipe(
          map(() => updateProductSuccess({ product })),
          catchError(error =>
            of(updateProductFailure({ error }))
          )
        )
      )
    )
  );


  // SUCCESS Effects /////////////////////////////////////

  deleteProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductSuccess),
      tap(() => {
        this.ConfirmAndLog('Product deleted.');
        this.productService.resetList();
        this.router.navigateByUrl("/products");
      })
    ),
    { dispatch: false }
  );

  addProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductSuccess),
      tap(() => {
        this.ConfirmAndLog('New product created.');
        this.productService.resetList();
        this.router.navigateByUrl("/products");
      })
    ),
    { dispatch: false }
  );

  updateProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProductSuccess),
      tap(() => {
        this.ConfirmAndLog('Product updated.');
        this.productService.resetList();
        this.router.navigateByUrl("/products");
      })
    ),
    { dispatch: false }
  );


  // FAILURE Effects /////////////////////////////////////

  deleteProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductFailure),
      tap(() => {
        this.ConfirmAndLog('Could not delete Product!');
      })
    ),
    { dispatch: false }
  );

  addProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductFailure),
      tap(() => {
        this.ConfirmAndLog('Could not create Product!');
      })
    ),
    { dispatch: false }
  );

  updateProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProductFailure),
      tap(() => {
        this.ConfirmAndLog('Could not update Product!');
      })
    ),
    { dispatch: false }
  );


  // UTILITY Function /////////////////////////////////////

  ConfirmAndLog(message: string): void {
    this.snackBar.open(message, 'ok', {
      duration: 1200,
    });
    console.log(message);
  }

}
