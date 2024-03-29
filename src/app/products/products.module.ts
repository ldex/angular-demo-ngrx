import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { OrderBy } from './orderBy.pipe';
import { ProductService } from '@app/products/services/product.service';
import { ProductInsertComponent } from '@app/products/components/product-insert/product-insert.component';
import { ProductListComponent } from '@app/products/components/product-list/product-list.component';
import { ProductDetailComponent } from '@app/products/components/product-detail/product-detail.component';
import { MyMaterialModule } from '@app/material/my-material.module';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';
import { RouterModule } from '@angular/router';
import { ProductStoreComponent } from './components/product-store/product-store.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        //ProductsRoutingModule,
        RouterModule,
        MyMaterialModule,
        StoreModule.forFeature(fromProduct.productsFeatureKey, fromProduct.reducer),
        EffectsModule.forFeature([ProductsEffects]),
    ],
    exports: [
        ProductListComponent
    ],
    declarations: [
        ProductDetailComponent,
        ProductListComponent,
        ProductInsertComponent,
        OrderBy,
        ProductStoreComponent
    ],
    providers: [
        ProductService
    ],
})
export class ProductsModule { }
