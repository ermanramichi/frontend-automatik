import { Component, signal } from '@angular/core';
import { ProductCardComponent } from "../../product-card-component/product-card-component";
import { SliderWithButtons } from "../../ui-kits/slider-with-buttons/slider-with-buttons";

@Component({
  selector: 'app-recommended-products-component',
  imports: [SliderWithButtons],
  templateUrl: './recommended-products-component.html',
  styleUrl: './recommended-products-component.css'
})
export class RecommendedProductsComponent {

  type='product'
  cardSize=350;


}
