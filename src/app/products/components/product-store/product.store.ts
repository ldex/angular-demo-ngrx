import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "@app/products/models/product.model";
import { ProductService } from "@app/products/services";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { finalize, map, switchMap, tap } from "rxjs/operators";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: HttpErrorResponse;
}

@Injectable({ providedIn: "root" })
export class ProductStore extends ComponentStore<ProductState> {
  readonly products$ = this.state$.pipe(map((state) => state.products));

  readonly loading$ = this.state$.pipe(map((state) => state.loading));

  constructor(private productService: ProductService) {
    super({ products: [], loading: false, error: null });
  }

  setLoading(loading: boolean) {
    this.setState((state) => {
      return {
        ...state,
        loading,
      };
    });
  }

  setError(error: HttpErrorResponse) {
    this.setState((state) => {
      return {
        ...state,
        loading: false,
        error,
      };
    });
  }

  setProducts(products: Product[]) {
    this.setState((state) => {
      return {
        ...state,
        products,
      };
    });
  }

  readonly getProducts = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.productService.products$.pipe(
          tapResponse(
            (products: Product[]) => this.setProducts(products),
            (error: HttpErrorResponse) => this.setError(error)
          ),
          finalize(() => this.setLoading(false))
        )
      )
    )
  );
}
