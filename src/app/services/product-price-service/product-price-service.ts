import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
export interface ProductPrice{
  ProductID:string;
  StoreID:string;
  Price:number;
  Currency:string;
  ProductUrl:string | null;
}
@Component({
  selector: 'app-product-price-service',
  imports: [],
  templateUrl: './product-price-service.html',
  styleUrl: './product-price-service.css',
})
@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {
 private jsonUrl: string = 'assets/ProductPrices.json';
 constructor(private http: HttpClient) {}
 getByProductId(productId: string) {
    return this.http.get<ProductPrice[]>(this.jsonUrl).pipe(
      map(prices => prices.filter(price => price.ProductID === productId))
    );
  }
  getAllPrices(){
    return this.http.get<ProductPrice[]>(this.jsonUrl);
  }
}
