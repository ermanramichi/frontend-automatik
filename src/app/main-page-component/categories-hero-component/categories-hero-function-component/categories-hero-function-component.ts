import { Component, OnInit } from '@angular/core';
import { CategoryIconMain } from "../../../ui-kits/category-icon-main/category-icon-main";
import { HeadCategory, HeadCategoryService } from '../../../services/head-category-service/head-category-service';

@Component({
  selector: 'app-categories-hero-function-component',
  imports: [CategoryIconMain],
  templateUrl: './categories-hero-function-component.html',
  styleUrl: './categories-hero-function-component.css'
})
export class CategoriesHeroFunctionComponent implements OnInit {
  headcategories:HeadCategory[]=[];
   constructor(
    private headCategoryService: HeadCategoryService
   ) {}

   ngOnInit(): void {
     this.headCategoryService.getHeadCategories().subscribe((categories) => {
      this.headcategories = categories;
    });
   }
}
