import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

export interface Product {
  ID: string;
  Name: string;
  Brand: string;
  HeadCategoryID: string;
  CategoryID: string;
  SubCategoryID: string;
  ImageUrl: string;
  Description: string;
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
  private jsonUrl: string = 'assets/Products.json';
  private productsCache$: Observable<Product[]> | null = null;

  constructor(private http: HttpClient) {}

  // Cache products to avoid multiple HTTP requests
  private getCachedProducts(): Observable<Product[]> {
    if (!this.productsCache$) {
      this.productsCache$ = this.http.get<Product[]>(this.jsonUrl).pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Error loading products:', error);
          return of([]);
        })
      );
    }
    return this.productsCache$;
  }

  getProducts(): Observable<Product[]> {
    return this.getCachedProducts();
  }

  getProductsById(id: string): Observable<Product[]> {
    return this.getCachedProducts().pipe(
      map(products => products.filter(product => product.ID === id))
    );
  }

  getProductsByCategory(categoryID: string): Observable<Product[]> {
    return this.getCachedProducts().pipe(
      map(products => products.filter(product => product.CategoryID === categoryID))
    );
  }

  getProductsBySubCategory(subCategoryID: string): Observable<Product[]> {
    return this.getCachedProducts().pipe(
      map(products => products.filter(product => product.SubCategoryID === subCategoryID))
    );
  }

  getProductsByHeadCategory(headCategoryID: string): Observable<Product[]> {
    return this.getCachedProducts().pipe(
      map(products => products.filter(product => product.HeadCategoryID === headCategoryID))
    );
  }

  // Fixed pagination with metadata
  getProductsByPage(pageNumber: number, pageSize: number): Observable<PaginatedResponse> {
    return this.getCachedProducts().pipe(
      map(products => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = products.slice(startIndex, endIndex);

        return {
          products: paginatedProducts,
          totalItems: products.length,
          currentPage: pageNumber,
          totalPages: Math.ceil(products.length / pageSize)
        };
      })
    );
  }

  // Bonus: Paginate filtered products by category
  getProductsByCategoryPaginated(
    categoryID: string, 
    pageNumber: number, 
    pageSize: number
  ): Observable<PaginatedResponse> {
    return this.getCachedProducts().pipe(
      map(products => {
        const filtered = products.filter(product => product.CategoryID === categoryID);
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = filtered.slice(startIndex, endIndex);

        return {
          products: paginatedProducts,
          totalItems: filtered.length,
          currentPage: pageNumber,
          totalPages: Math.ceil(filtered.length / pageSize)
        };
      })
    );
  }

  // Clear cache if needed (e.g., after data updates)
  clearCache(): void {
    this.productsCache$ = null;
  }
}