import { Component } from '@angular/core';
import { CategoryIconMain } from "../../../ui-kits/category-icon-main/category-icon-main";

@Component({
  selector: 'app-categories-hero-function-component',
  imports: [CategoryIconMain],
  templateUrl: './categories-hero-function-component.html',
  styleUrl: './categories-hero-function-component.css'
})
export class CategoriesHeroFunctionComponent {
  categories = [
    {
      id:1,
      name:'Phones',
      iconUrl: 'assets/mobile.svg'
    },
    {
      id:2,
      name:'Car Accesories',
      iconUrl: 'assets/car.svg'
    },
    {
      id:3,
      name:'Kitchen Appliances',
      iconUrl: 'assets/kitchen.svg'
    },
    {
      id:4,
      name:'Televisions',
      iconUrl: 'assets/tv.svg'
    },
    {
      id:5,
      name:'Notebooks',
      iconUrl: 'assets/notebooks.svg'
    },
    {
      id:6,
      name:'Decorations',
      iconUrl: 'assets/decoration.svg'
    },
    {
      id:7,
      name:'Fragrances',
      iconUrl: 'assets/fragrances.svg'
    },
    {
      id:8,
      name:'Clothes',
      iconUrl: 'assets/clothes.svg'
    },
  ]
}
