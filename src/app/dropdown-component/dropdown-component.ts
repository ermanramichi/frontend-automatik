import { HeadCategory, HeadCategoryService } from './../services/head-category-service/head-category-service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { Category, CategoryService } from '../services/category-service/category-service';
import { SubCategoriesService, SubCategory } from '../services/sub-categories-service/sub-categories-service';


@Component({
  selector: 'app-dropdown-component',
  imports: [],
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.css'
})
export class DropdownComponent implements OnInit {


  constructor(
    private headCategoryService:HeadCategoryService,
    private categoryService:CategoryService,
    private subCategoriesService:SubCategoriesService
  ) {}
  @Input() dropDownActive!:boolean;
  @Output() notActive = new EventEmitter<boolean>();
  selectedCategoryId:string='HC01';
  headCategories:HeadCategory[] = [];
  categories:Category[] = [];
  subCategories:SubCategory[] = [];

  get baseClasses():string{

    const baseClasses = 'drop-down w-[1400px] min-h-[300px] h-fit bg-white fixed top-24 left-1/2 -translate-x-1/2   flex items-start justify-start shadow-xl transition-all duration-300 ease-in-out rounded-b-xl';
      if (this.dropDownActive) {
      return `${baseClasses} z-[9998] opacity-100 translate-y-0`;
    }

      return `${baseClasses} z-[9998] opacity-0 translate-y-4 pointer-events-none`;

}
  ngOnInit(): void {
    this.headCategoryService.getHeadCategories().subscribe((data: HeadCategory[]) => {
        this.headCategories = data;
      });
      this.categoryService.getCategories().subscribe((data: Category[]) => {
        this.categories = data;
      });
      this.subCategoriesService.getSubCategories().subscribe((data: SubCategory[]) => {
        this.subCategories = data;
      });
  }
  closeDropdown(){
    this.notActive.emit(false);
  }
  onCategorySelected(categoryId:string){
    this.selectedCategoryId=categoryId;
  }
  filteredCategories():Category[]{
    return this.categories.filter(cat=>cat.ParentID===this.selectedCategoryId);
  }
  filteredSubCategories(categoryId: string): SubCategory[] {
    return this.subCategories.filter(sub => sub.ParentID === categoryId);
  }

}


