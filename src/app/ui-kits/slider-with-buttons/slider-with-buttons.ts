import { Component, Input } from '@angular/core';

import { PromotionsMainpageFunctionComponent } from "../../promotions-mainpage-component/promotions-mainpage-function-component/promotions-mainpage-function-component";
import { RecommendedProductsFunctionComponent } from "../../main-page-component/recommended-products-component/recommended-products-function-component/recommended-products-function-component";
import { GoRightButton } from "../go-right-button/go-right-button";
import { GoLeftButton } from "../go-left-button/go-left-button";
import { CategoryIconMain } from "../category-icon-main/category-icon-main";
import { CategoriesHeroFunctionComponent } from "../../main-page-component/categories-hero-component/categories-hero-function-component/categories-hero-function-component";
import { HeadCategory } from '../../services/head-category-service/head-category-service';

@Component({
  selector: 'app-slider-with-buttons',
  imports: [PromotionsMainpageFunctionComponent, RecommendedProductsFunctionComponent, GoRightButton, GoLeftButton, CategoriesHeroFunctionComponent],
  templateUrl: './slider-with-buttons.html',
  styleUrl: './slider-with-buttons.css'
})
export class SliderWithButtons {

  @Input() cardSize !:number;
  @Input() type !:string;
  @Input() headCategories!: HeadCategory[];



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
