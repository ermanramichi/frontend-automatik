import { Component, Input } from '@angular/core';

import { PromotionsMainpageFunctionComponent } from "../../promotions-mainpage-component/promotions-mainpage-function-component/promotions-mainpage-function-component";
import { RecommendedProductsFunctionComponent } from "../../main-page-component/recommended-products-component/recommended-products-function-component/recommended-products-function-component";
import { GoRightButton } from "../go-right-button/go-right-button";
import { GoLeftButton } from "../go-left-button/go-left-button";
import { CategoryIconMain } from "../category-icon-main/category-icon-main";
interface Promotion {
  id: number;
  title: string;
  imageUrl: string;
}
interface Category{
  id:number;
  name:string;
  iconUrl:string;
}
@Component({
  selector: 'app-slider-with-buttons',
  imports: [PromotionsMainpageFunctionComponent, RecommendedProductsFunctionComponent, GoRightButton, GoLeftButton, CategoryIconMain],
  templateUrl: './slider-with-buttons.html',
  styleUrl: './slider-with-buttons.css'
})
export class SliderWithButtons {
  @Input() promotions!:Promotion[];
  @Input() cardSize !:number;
  @Input() type !:string
  @Input() categories!:Category[]


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
