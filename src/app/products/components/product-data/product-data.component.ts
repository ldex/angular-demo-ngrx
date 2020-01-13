import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@app/products/models/product.model';
import { ProductDataService } from '@app/products/services/product-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'price'];
  loading$: Observable<boolean>;
  products$: Observable<Product[]>;
  title = 'Products (with NgRx Data)';

  constructor(
    private productDataService: ProductDataService,
    private router: Router) {
    this.products$ = productDataService.entities$;
    this.loading$ = productDataService.loading$;
  }

  ngOnInit() {
    this.getProducts();
  }

  add(product: Product) {
    this.productDataService.add(product);
  }

  delete(product: Product) {
    this.productDataService.delete(product.id);
  }

  getProducts() {
    this.productDataService.getAll();
  }

  update(product: Product) {
    this.productDataService.update(product);
  }

  onSelect(product: Product): void {
    this.router.navigateByUrl("/products/" + product.id);
  }
}