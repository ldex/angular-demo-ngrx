import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from '@app/products/components/product-list/product-list.component';
import { ProductInsertComponent } from '@app/products/components/product-insert/product-insert.component';
import { ProductDetailComponent } from '@app/products/components/product-detail/product-detail.component';
import { ProductStoreComponent } from './components/product-store/product-store.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'store', component: ProductStoreComponent },
  { path: 'insert', component: ProductInsertComponent },
  { path: ':id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }