import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { loadProducts, loadProductsSuccess, loadProductsFailure, deleteProduct, deleteProductSuccess, deleteProductFailure } from './product.actions';
import { ProductService } from './services';
import { Product } from './models/product.model';
import { MatSnackBar } from '@angular/material';
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

  deleteProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductFailure),
      tap(() => {
        this.ConfirmAndLog('Could not delete Product!');
      })
    ),
    { dispatch: false }
  );

  ConfirmAndLog(message: string): void {
    this.snackBar.open(message, 'ok', {
      duration: 1200,
    });
    console.log(message);
  }

}
