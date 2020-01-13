import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, shareReplay, delay } from "rxjs/operators";
import { Product } from '@app/products/models/product.model';
import { config } from '@env/environment';

@Injectable()
export class ProductService {

    private baseUrl: string = config.baseUrl;
    public products$: Observable<Product[]>;

    constructor(private http: HttpClient) {
        this.loadProducts();
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + id);
    }

    insertProduct(newProduct: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, newProduct);
    }

    getProductById(id: number): Observable<Product> {
        return this.products$
            .pipe(
                map(products => products.find(product => product.id == id)),
                tap(product => console.log('selected product:', product)),
                catchError(this.handleError)
            )
    }

    resetList() {
        this.loadProducts();
    }

    // getProducts(): Observable<Product[]> {
    //     let url: string = this.baseUrl + `?$orderby=ModifiedDate%20desc`;
    //     return this.http.get<Product[]>(url)
    //         .pipe(
    //             //   tap(console.table),
    //             shareReplay(),
    //             delay(500),
    //             catchError(this.handleError)
    //         );
    // }

    private loadProducts() {
        let url: string = this.baseUrl + `?$orderby=ModifiedDate%20desc`;
        this.products$ = this.http.get<Product[]>(url)
            .pipe(
               // tap(console.table),
                shareReplay(),
                delay(200),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        // in a real world app, you may send the error to the server using some remote logging infrastructure
        // instead of just logging it to the console
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = 'An error occurred:' + error.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`;
        }
        console.error(errorMsg);
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
