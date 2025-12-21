import { Component, Input } from '@angular/core';

import { Button } from "../../ui-kits/button/button";

@Component({
  selector: 'app-product-card-component',
  imports: [Button],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css'
})
export class ProductCardComponent {

  @Input() product!: any;

  getPercentageDiscount(originalPrice: number, discountedPriceedPrice: number):number{
    const percentage= ((originalPrice - discountedPriceedPrice) / originalPrice) * 100;
    return Math.round(percentage);
  }
}
