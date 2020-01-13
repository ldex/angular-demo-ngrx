import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductActions from './product.actions';
import { Product } from './models/product.model';
import { HttpErrorResponse } from '@angular/common/http';

export const productsFeatureKey = 'products';

export interface ProductState extends EntityState<Product> {
  loading: boolean;
  error: HttpErrorResponse;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const defaultProductState = {
  loading: false,
  error: null
};

export const initialState: ProductState = adapter.getInitialState(defaultProductState);

const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.updateProduct,
    (state, action) => adapter.updateOne(action.product, state)
  ),
  on(ProductActions.loadProducts,
    state => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(ProductActions.loadProductsSuccess,
    (state, action) => ({
      ...adapter.addAll(action.products, state),
      loading: false,
      error: null
    })
  ),
  on(ProductActions.deleteProductSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.loadProductsFailure,
    ProductActions.deleteProductFailure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    })
  ),
  // on(ProductActions.clearProducts,
  //   state => adapter.removeAll(state)
  // ),
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();