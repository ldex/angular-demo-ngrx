import { Router } from "@angular/router";
import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Product } from '@app/products/models/product.model';
import { ProductService, FavouriteService } from "@app/products/services/";
import { Store } from '@ngrx/store';
import { ProductState } from '@app/products/product.reducer';
import { loadProducts } from '@app/products/product.actions';
import * as selectors from '@app/products/products.selectors';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, AfterViewInit {
    displayedColumns = ['id', 'name', 'description', 'price'];
    dataSource: MatTableDataSource<Product> = new MatTableDataSource();
    isLoading: boolean = false;
    subscription: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    title: string = "Products";
    products$: Observable<Product[]>;

    onSelect(product: Product): void {
        this.router.navigateByUrl("/products/" + product.id);
    }

    get favourites(): number {
        return this.favouriteService.getFavouritesNb();
    }

    constructor(
        private store: Store<ProductState>,
        private favouriteService: FavouriteService,
        private router: Router) { }

    ngOnInit() {

        this
            .store
            .select(selectors.isProductsLoading)
            .subscribe(
                isLoading => this.isLoading = isLoading
            )

        this
            .store
            .select(selectors.selectAllProducts)
            .subscribe(
                data => this.dataSource.data = data,
                error => console.log(error)
            );

        this
            .store
            .dispatch(loadProducts())

        // this.subscription = this.productService
        //     .products$
        //     .subscribe(
        //         data => this.dataSource.data = data,
        //         error => console.log(error),
        //         () => this.isLoading = false
        //     );
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase(); // Defaults to lowercase matches
        this.paginator.pageIndex = 0; // reset back to the first page.
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}