import { Description } from './../../../../node_modules/jackspeak/dist/esm/index.d';
import { Head } from './../../../../node_modules/rxjs/src/internal/types';
import { Name } from './../../../../node_modules/ajv/lib/compile/codegen/code';
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
export interface Product{
  ID:string;
  Name:string;
  Brand:string;
  HeadCategoryID:string;
  CategoryID:string;
  SubCategoryID:string;
  ImageUrl:string;
  Description:string;
}
@Component({
  selector: 'app-product-service',
  imports: [],
  templateUrl: './product-service.html',
  styleUrl: './product-service.css',
})
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private jsonUrl: string = 'assets/Products.json';
  constructor(private http: HttpClient) {} 
  getProducts() {
    return this.http.get<Product[]>(this.jsonUrl);
  } 
  getProductsById(id:string) {
    return this.http.get<Product[]>(this.jsonUrl).pipe(
      map(products => products.filter(product => product.ID === id))
    );
  }
  getProductsByCategory(categoryID:string) {
    return this.http.get<Product[]>(this.jsonUrl).pipe(
      map(products => products.filter(product => product.CategoryID === categoryID))
    );
  }
  getProductsBySubCategory(subCategoryID:string) {
    return this.http.get<Product[]>(this.jsonUrl).pipe(
      map(products => products.filter(product => product.SubCategoryID === subCategoryID))
    );
  }
  getProductsByHeadCategory(headCategoryID:string) {
    return this.http.get<Product[]>(this.jsonUrl).pipe(
      map(products => products.filter(product => product.HeadCategoryID === headCategoryID))
    );
  }
}