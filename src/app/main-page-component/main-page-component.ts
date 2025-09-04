import { Component } from '@angular/core';
import { HeroSearchComponent } from "./hero-search-component/hero-search-component";
import { RecommendedProductsComponent } from "./recommended-products-component/recommended-products-component";
import { PromotionsMainpageComponent } from "../promotions-mainpage-component/promotions-mainpage-component";

@Component({
  selector: 'app-main-page-component',
  imports: [HeroSearchComponent, RecommendedProductsComponent, PromotionsMainpageComponent],
  templateUrl: './main-page-component.html',
  styleUrl: './main-page-component.css'
})
export class MainPageComponent {

}
