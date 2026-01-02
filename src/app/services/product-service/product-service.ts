import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { ProductPrice } from '../product-price-service/product-price-service';

export interface Product {
  isRecommended: boolean;
  ID: string;
  Name: string;
  Brand: string;
  HeadCategoryID: string;
  CategoryID: string;
  SubCategoryID: string;
  ImageUrl: string;
  Description: string;
  MinimumPrice?: number | null;
}

export interface PaginatedResponse {
  products: Product[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'assets/Products.json';
  private pricesUrl   = 'assets/ProductPrices.json';

  private productsCache$: Observable<Product[]> | null = null;
  private pricesCache$: Observable<ProductPrice[]> | null = null;

  constructor(private http: HttpClient) {}

  /* =======================
     CACHED DATA SOURCES
     ======================= */

  private getCachedProducts(): Observable<Product[]> {
    if (!this.productsCache$) {
      this.productsCache$ = this.http.get<Product[]>(this.productsUrl).pipe(
        shareReplay(1),
        catchError(err => {
          console.error('Error loading products', err);
          return of([]);
        })
      );
    }
    return this.productsCache$;
  }

  private getCachedPrices(): Observable<ProductPrice[]> {
    if (!this.pricesCache$) {
      this.pricesCache$ = this.http.get<ProductPrice[]>(this.pricesUrl).pipe(
        shareReplay(1),
        catchError(err => {
          console.error('Error loading prices', err);
          return of([]);
        })
      );
    }
    return this.pricesCache$;
  }

  /* =======================
     PRODUCTS WITH MIN PRICE
     ======================= */

  getProductsWithMinimumPrice(): Observable<Product[]> {
    return combineLatest([
      this.getCachedProducts(),
      this.getCachedPrices()
    ]).pipe(
      map(([products, prices]) =>
        products.map(product => {
          const productPrices = prices
            .filter(p => p.ProductID === product.ID)
            .map(p => p.Price);

          return {
            ...product,
            MinimumPrice: productPrices.length
              ? Math.min(...productPrices)
              : null
          };
        })
      )
    );
  }

  /* =======================
     BASIC GETTERS
     ======================= */

  getProducts(): Observable<Product[]> {
    return this.getProductsWithMinimumPrice();
  }

  getProductsById(id: string): Observable<Product[]> {
    return this.getProductsWithMinimumPrice().pipe(
      map(products => products.filter(p => p.ID === id))
    );
  }

  getProductsByCategory(categoryID: string): Observable<Product[]> {
    return this.getProductsWithMinimumPrice().pipe(
      map(products => products.filter(p => p.CategoryID === categoryID))
    );
  }

  getProductsBySubCategory(subCategoryID: string): Observable<Product[]> {
    return this.getProductsWithMinimumPrice().pipe(
      map(products => products.filter(p => p.SubCategoryID === subCategoryID))
    );
  }

  getProductsByHeadCategory(headCategoryID: string): Observable<Product[]> {
    return this.getProductsWithMinimumPrice().pipe(
      map(products => products.filter(p => p.HeadCategoryID === headCategoryID))
    );
  }

  /* =======================
     PAGINATION
     ======================= */

  getProductsByPage(
    pageNumber: number,
    pageSize: number
  ): Observable<PaginatedResponse> {
    return this.getProductsWithMinimumPrice().pipe(
      map(products => {
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize;

        return {
          products: products.slice(start, end),
          totalItems: products.length,
          currentPage: pageNumber,
          totalPages: Math.ceil(products.length / pageSize)
        };
      })
    );
  }

  getProductsByCategoryPaginated(
    categoryID: string,
    pageNumber: number,
    pageSize: number
  ): Observable<PaginatedResponse> {
    return this.getProductsWithMinimumPrice().pipe(
      map(products => {
        const filtered = products.filter(
          p => p.CategoryID === categoryID
        );

        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize;

        return {
          products: filtered.slice(start, end),
          totalItems: filtered.length,
          currentPage: pageNumber,
          totalPages: Math.ceil(filtered.length / pageSize)
        };
      })
    );
  }

  /* =======================
     CACHE CONTROL
     ======================= */

  clearCache(): void {
    this.productsCache$ = null;
    this.pricesCache$ = null;
  }
}
