import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductActions from './product.actions';
import { Product } from './models/product.model';
import { HttpErrorResponse } from '@angular/common/http';

export const productsFeatureKey = 'products';

// Defining the product state /////////////////////////////////////
export interface ProductState extends EntityState<Product> {
  // additional state property
  loading: boolean;
  error: HttpErrorResponse;
}

// Creating the entity adapter /////////////////////////////////////
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

// Initializing the default state /////////////////////////////////////
export const defaultProductState = {
  loading: false,
  error: null
};
export const initialState: ProductState = adapter.getInitialState(defaultProductState);

// Creating the reducer /////////////////////////////////////
const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts,
    state => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(ProductActions.loadProductsSuccess,
    (state, action) => ({
      ...adapter.setAll(action.products, state),
      loading: false,
      error: null
    })
  ),
  on(ProductActions.addProductSuccess,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.updateProductSuccess,
    (state, action) => adapter.updateOne(action.product, state)
  ),
  on(ProductActions.deleteProductSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.loadProductsFailure,
    ProductActions.deleteProductFailure,
    ProductActions.addProductFailure,
    ProductActions.updateProductFailure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    })
  ),
  on(ProductActions.clearProducts,
    state => adapter.removeAll(state)
  ),
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