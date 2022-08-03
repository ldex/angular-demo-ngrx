import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Product } from '@app/products/models/product.model';
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

    title: string = "Products";
    loading$: Observable<boolean>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private store: Store<ProductState>) { }

    ngOnInit() {
        // Get loading indicator from the Store
        this.loading$ = this
                            .store
                            .select(selectors.isProductsLoading);

        // Get products from the Store
        this
            .store
            .select(selectors.selectAllProducts)
            .subscribe(
                (data: Product[]) => this.dataSource.data = data,
                error => console.log(error)
            );

        // Load the products
        this
            .store
            .dispatch(loadProducts())


        // BEFORE NGRX
        //
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase(); // Defaults to lowercase matches
        this.paginator.pageIndex = 0; // reset back to the first page.
    }
}