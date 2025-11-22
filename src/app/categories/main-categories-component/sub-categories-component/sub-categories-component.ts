import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-categories-component',
  imports: [],
  templateUrl: './sub-categories-component.html',
  styleUrl: './sub-categories-component.css'
})
export class SubCategoriesComponent {
  @Input() selectedCategoryId!: number;
  
  subCategories = [
  {
    "categoryId": 1,
    "id": 101,
    "name": "Smartphones"
  },
  {
    "categoryId": 1,
    "id": 102,
    "name": "Laptops"
  },
  {
    "categoryId": 1,
    "id": 103,
    "name": "Tablets"
  },
  {
    "categoryId": 1,
    "id": 104,
    "name": "Headphones"
  },
  {
    "categoryId": 1,
    "id": 105,
    "name": "Cameras"
  },
  {
    "categoryId": 2,
    "id": 201,
    "name": "Refrigerators"
  },
  {
    "categoryId": 2,
    "id": 202,
    "name": "Washing Machines"
  },
  {
    "categoryId": 2,
    "id": 203,
    "name": "Microwaves"
  },
  {
    "categoryId": 2,
    "id": 204,
    "name": "Vacuum Cleaners"
  },
  {
    "categoryId": 2,
    "id": 205,
    "name": "Air Conditioners"
  },
  {
    "categoryId": 3,
    "id": 301,
    "name": "Men's Wear"
  },
  {
    "categoryId": 3,
    "id": 302,
    "name": "Women's Wear"
  },
  {
    "categoryId": 3,
    "id": 303,
    "name": "Kids' Clothing"
  },
  {
    "categoryId": 3,
    "id": 304,
    "name": "Footwear"
  },
  {
    "categoryId": 3,
    "id": 305,
    "name": "Accessories"
  },
  {
    "categoryId": 3,
    "id": 306,
    "name": "Outerwear"
  },
  {
    "categoryId": 4,
    "id": 401,
    "name": "Skincare"
  },
  {
    "categoryId": 4,
    "id": 402,
    "name": "Makeup"
  },
  {
    "categoryId": 4,
    "id": 403,
    "name": "Hair Care"
  },
  {
    "categoryId": 4,
    "id": 404,
    "name": "Fragrances"
  },
  {
    "categoryId": 4,
    "id": 405,
    "name": "Personal Hygiene"
  },
  {
    "categoryId": 5,
    "id": 501,
    "name": "Fitness Equipment"
  },
  {
    "categoryId": 5,
    "id": 502,
    "name": "Outdoor Gear"
  },
  {
    "categoryId": 5,
    "id": 503,
    "name": "Cycling"
  },
  {
    "categoryId": 5,
    "id": 504,
    "name": "Camping & Hiking"
  },
  {
    "categoryId": 5,
    "id": 505,
    "name": "Team Sports"
  },
  {
    "categoryId": 6,
    "id": 601,
    "name": "Action Figures"
  },
  {
    "categoryId": 6,
    "id": 602,
    "name": "Board Games"
  },
  {
    "categoryId": 6,
    "id": 603,
    "name": "Educational Toys"
  },
  {
    "categoryId": 6,
    "id": 604,
    "name": "Building Sets"
  },
  {
    "categoryId": 6,
    "id": 605,
    "name": "Dolls & Plush Toys"
  },
  {
    "categoryId": 6,
    "id": 606,
    "name": "Remote Control Toys"
  }
]

}
