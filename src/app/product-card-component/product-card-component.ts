import { Component, Input } from '@angular/core';
import { RecommendedProductsComponent } from '../main-page-component/recommended-products-component/recommended-products-component';
import { Button } from "../ui-kits/button/button";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  discountedPrice: number;
}
@Component({
  selector: 'app-product-card-component',
  imports: [Button],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css'
})
export class ProductCardComponent {

  @Input() product!: Product;

  getPercentageDiscount(originalPrice: number, discountedPriceedPrice: number):number{
    const percentage= ((originalPrice - discountedPriceedPrice) / originalPrice) * 100;
    return Math.round(percentage);
  }
}
