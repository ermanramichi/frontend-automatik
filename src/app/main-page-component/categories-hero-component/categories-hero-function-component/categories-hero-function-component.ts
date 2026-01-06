import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CategoryIconMain } from "../../../ui-kits/category-icon-main/category-icon-main";
import { HeadCategory, HeadCategoryService } from '../../../services/head-category-service/head-category-service';

@Component({
  selector: 'app-categories-hero-function-component',
  imports: [CategoryIconMain],
  templateUrl: './categories-hero-function-component.html',
  styleUrl: './categories-hero-function-component.css'
})
export class CategoriesHeroFunctionComponent {
  @Input() headCategories: HeadCategory[] = [];

  ngOnChanges(changes: SimpleChanges) {
    console.log('=== CHILD ngOnChanges ===');
    console.log('Received headCategories:', this.headCategories);
    console.log('Length:', this.headCategories.length);
  }
}
