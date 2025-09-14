import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeroSearchComponent } from "./hero-search-component/hero-search-component";
import { RecommendedProductsComponent } from "./recommended-products-component/recommended-products-component";
import { PromotionsMainpageComponent } from "../promotions-mainpage-component/promotions-mainpage-component";
import { DropdownComponent } from "../dropdown-component/dropdown-component";
import { CategoriesHeroComponent } from "./categories-hero-component/categories-hero-component";

@Component({
  selector: 'app-main-page-component',
  imports: [HeroSearchComponent, RecommendedProductsComponent, PromotionsMainpageComponent, DropdownComponent, CategoriesHeroComponent],
  templateUrl: './main-page-component.html',
  styleUrl: './main-page-component.css'
})
export class MainPageComponent {
  @Input() isActive!:boolean;
  
  @Output() isNotActive= new EventEmitter<void>();
  onClick(){
    console.log("test")
   
    this.isNotActive.emit();
  }
  get backDropClass():string{
  const baseClasses = 'w-full flex flex-col transition-all duration-300 ease-in-out';

    if (this.isActive) {
      return `${baseClasses} blur-[5px]`;
    }

    return `${baseClasses}`;

  }
  toggleDropdown(){
    this.isActive=!this.isActive;
  }
  

}
