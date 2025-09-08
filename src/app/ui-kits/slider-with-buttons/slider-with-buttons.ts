import { Component, Input } from '@angular/core';

import { PromotionsMainpageFunctionComponent } from "../../promotions-mainpage-component/promotions-mainpage-function-component/promotions-mainpage-function-component";
import { RecommendedProductsFunctionComponent } from "../../main-page-component/recommended-products-component/recommended-products-function-component/recommended-products-function-component";
interface Promotion {
  id: number;
  title: string;
  imageUrl: string;
}
@Component({
  selector: 'app-slider-with-buttons',
  imports: [PromotionsMainpageFunctionComponent, RecommendedProductsFunctionComponent],
  templateUrl: './slider-with-buttons.html',
  styleUrl: './slider-with-buttons.css'
})
export class SliderWithButtons {
  @Input() promotions!:Promotion[];
  @Input() cardSize !:number;
  @Input() type !:string


scrollRight(slider: HTMLElement): void {
    slider.scrollBy({
      left: this.cardSize,
      behavior: 'smooth'
    });
  }

  scrollLeft(slider: HTMLElement): void {
    slider.scrollBy({
      left: -this.cardSize,
      behavior: 'smooth'
    });
  }

}
