import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@app/products/models/product.model';
import { ProductDataService } from '@app/products/services/product-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'price'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  title = 'Products (with NgRx Data)';
  loading$: Observable<boolean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productDataService: ProductDataService) {
  }

  ngOnInit() {
    // Get loading indicator from the service
    this.loading$ = this.productDataService.loading$;

    // Get products from the service
    this.productDataService.entities$.subscribe(
      data => this.dataSource.data = data,
      error => console.log(error)
    );

    // Load the products
    this.productDataService.getAll();
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