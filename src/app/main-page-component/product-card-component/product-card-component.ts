import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-card-component',
  imports: [RouterLink],
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
