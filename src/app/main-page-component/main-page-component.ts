import { Component } from '@angular/core';
import { HeroSearchComponent } from "./hero-search-component/hero-search-component";
import { RecommendedProductsComponent } from "./recommended-products-component/recommended-products-component";

@Component({
  selector: 'app-main-page-component',
  imports: [HeroSearchComponent, RecommendedProductsComponent],
  templateUrl: './main-page-component.html',
  styleUrl: './main-page-component.css'
})
export class MainPageComponent {

}
