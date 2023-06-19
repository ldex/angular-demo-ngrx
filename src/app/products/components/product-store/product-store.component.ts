import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Product } from '@app/products/models/product.model';
import { ProductState, ProductStore } from './product.store';

@Component({
    selector: 'app-product-store',
    templateUrl: './product-store.component.html',
    styleUrls: ['./product-store.component.css']
})
export class ProductStoreComponent implements OnInit, AfterViewInit {
    displayedColumns = ['id', 'name', 'description', 'price'];
    dataSource: MatTableDataSource<Product> = new MatTableDataSource();

    title: string = "Products (with ComponentStore)";
    loading$: Observable<boolean>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private readonly productStore: ProductStore
        ) { }

    ngOnInit() {

        // Get loading indicator from the Component Store
        this.loading$ = this
                            .productStore
                            .loading$;

        // Get products from the Component Store (when any)
        this
        .productStore
        .products$
        .subscribe(
            (data: Product[]) => this.dataSource.data = data,
            error => console.log(error)
        )

        // Ask for the products to be loaded
        this
        .productStore
        .loadProducts();

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