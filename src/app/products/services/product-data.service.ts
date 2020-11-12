import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductDataService extends EntityCollectionServiceBase<Product> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);

    
  }
}