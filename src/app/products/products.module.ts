import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { OrderBy } from './orderBy.pipe';
import { ProductService } from '@app/products/services/product.service';
import { FavouriteService } from '@app/products/services/favourite.service';
import { ProductInsertComponent } from '@app/products/components/product-insert/product-insert.component';
import { ProductListComponent } from '@app/products/components/product-list/product-list.component';
import { ProductDetailComponent } from '@app/products/components/product-detail/product-detail.component';
import { MyMaterialModule } from '@app/material/my-material.module';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';
import { ProductDataComponent } from '@app/products/components/product-data/product-data.component';
import { RouterModule } from '@angular/router';

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
        ProductDataComponent
    ],
    providers: [
        ProductService,
        FavouriteService
    ],
})
export class ProductsModule { }
