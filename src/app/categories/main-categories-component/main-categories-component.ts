import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main-categories-component',
  imports: [],
  templateUrl: './main-categories-component.html',
  styleUrl: './main-categories-component.css'
})

export class MainCategoriesComponent {
  @Output() categorySelected = new EventEmitter<number>();
  activeCategoryId: number=1;
  triggerActiveClass = false;
  categories = [
  {
    "id": 1,
    "categoryName": "Electronics"
  },
  {
    "id": 2,
    "categoryName": "Home Appliances"
  },
  {
    "id": 3,
    "categoryName": "Clothing"
  },
  {
    "id": 4,
    "categoryName": "Beauty & Health"
  },
  {
    "id": 5,
    "categoryName": "Sports & Outdoors"
  },
  {
    "id": 6,
    "categoryName": "Toys & Games"
  }
];
onCategoryClick(categoryId: number) {
  this.activeCategoryId = categoryId;
  this.categorySelected.emit(categoryId);
  console.log('Category clicked:', categoryId);
}
}
