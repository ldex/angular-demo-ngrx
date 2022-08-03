import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterStateSerializer,
  RouterReducerState, FullRouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import {
  CustomRouterSerializer,
  RouterStateUrl,
} from './custom-router-serializer';
import { ROUTER_FEATURE_KEY } from './selectors';

import { HomeComponent } from '@app/shared/components/home.component';
import { ContactComponent } from '@app/shared/components/contact.component';
import { AdminComponent } from '@app/shared/components/admin.component';
import { ErrorComponent } from '@app/shared/components/error.component';
import { ProductListComponent } from '@app/products/components/product-list/product-list.component';
import { ProductDetailComponent } from '@app/products/components/product-detail/product-detail.component';
import { ProductInsertComponent } from '@app/products/components/product-insert/product-insert.component';
import { ProductDataComponent } from '@app/products/components/product-data/product-data.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  // { path:'products', loadChildren: 
  //       () => import('../products/products.module')
  //             .then(m => m.ProductsModule) },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/insert', component: ProductInsertComponent },
  { path: 'products/data', component: ProductDataComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo:'/error?reason=NavError' }
];

const initialState: RouterReducerState<RouterStateUrl> = {
  state: { url: '/', params: {} },
  navigationId: -1,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    StoreModule.forFeature(ROUTER_FEATURE_KEY, routerReducer, { initialState }),
    StoreRouterConnectingModule.forRoot({ serializer: FullRouterStateSerializer,
      stateKey: ROUTER_FEATURE_KEY,
    }),
  ],
  exports: [RouterModule],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterSerializer },
  ],
})
export class RoutingModule {}
