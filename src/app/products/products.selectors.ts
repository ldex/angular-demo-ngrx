import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productsFeatureKey, selectAll, selectEntities } from './product.reducer';
import * as routerSelectors from '../router/selectors';

export const selectProductState = createFeatureSelector<ProductState>(productsFeatureKey);

export const isProductsLoading = createSelector(
  selectProductState,
  state => state.loading
);

export const selectAllProducts = createSelector(selectProductState, selectAll);

export const selectCurrentProductId = routerSelectors.getRouterParam('id');

const selectProductDictionary = createSelector(selectProductState, selectEntities);

export const selectCurrentProduct = createSelector(
  selectProductDictionary,
  selectCurrentProductId,
  (products, id) => products[id]
);