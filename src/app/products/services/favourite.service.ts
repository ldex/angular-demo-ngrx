import { Injectable } from '@angular/core';
import { Product } from '@app/products/models/product.model';

@Injectable()
export class FavouriteService {

    constructor() { }

    private favourites: Set<Product> = new Set();
    get Favourites() {
        return this.favourites;
    }

    addToFavourites(product: Product): boolean {
        let exists: boolean = this.favourites.has(product);
        if(!exists) {
            this.favourites.add(product)
        }
        return !exists;
    }

    getFavouritesNb() : number {
        return this.favourites.size;
    }
}