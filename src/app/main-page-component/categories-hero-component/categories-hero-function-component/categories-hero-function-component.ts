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
      iconUrl: 'fa-solid fa-mobile-screen'
    },
    {
      id:2,
      name:'Car Accesories',
      iconUrl: 'fa-solid fa-car'
    },
    {
      id:3,
      name:'Kitchen Appliances',
      iconUrl: 'fa-solid fa-kitchen-set'
    },
    {
      id:4,
      name:'Televisions',
      iconUrl: 'fa-solid fa-tv'
    },
    {
      id:5,
      name:'Notebooks',
      iconUrl: 'fa-solid fa-laptop'
    },
    {
      id:6,
      name:'Decorations',
      iconUrl: 'fa-solid fa-couch'
    },
    {
      id:7,
      name:'Fragrances',
      iconUrl: 'fa-solid fa-bottle-water'
    },
    {
      id:8,
      name:'Clothes',
      iconUrl: 'fa-solid fa-shirt'
    },
  ]
}
