import { HeadCategory, HeadCategoryService } from './../services/head-category-service/head-category-service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Category, CategoryService } from '../services/category-service/category-service';
import { SubCategoriesService, SubCategory } from '../services/sub-categories-service/sub-categories-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dropdown-component',
  imports: [RouterLink],
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.css',
  animations: [
    trigger('slideAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' }),
    animate('300ms ease-out',
      style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })
    )
  ]),
  transition(':leave', [
    animate('300ms ease-in',
      style({ opacity: 0, transform: 'translate3d(-100%, 0, 0)' })
    )
  ])
])]
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
  isDesktop = false;
  isMobile = false;
  screenwidth = 0;
  mobileHeadCategoriesOpen=false;
  mobileCategoriesOpen=false;
  mobileSubCategoriesOpen=false;
  mobileHeadCategoryID:string='';
  mobileCategoryID:string='';
  mobileSubCategoryID:string='';
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize();
  }
  private updateScreenSize() {
    this.screenwidth = window.innerWidth;
    this.isMobile = this.screenwidth < 768;
    this.isDesktop = this.screenwidth >= 768;
  }

  get desktopClasses():string{

    const desktopClasses = 'drop-down w-[1400px] min-h-[300px] h-fit bg-white fixed top-24 left-1/2 -translate-x-1/2   flex items-start justify-start shadow-xl transition-all duration-300 ease-in-out rounded-b-xl';
      if (this.dropDownActive) {
      return `${desktopClasses} z-[9998] opacity-100 translate-y-0`;
    }

      return `${desktopClasses} z-[9998] opacity-0 translate-y-4 pointer-events-none`;

}
  get mobileClasses():string{

    const mobileClasses = 'drop-down w-full h-full bg-white fixed top-26 p-4 left-0 flex flex-col items-start justify-start shadow-xl rounded-b-xl';
      if (this.dropDownActive ) {
      return `${mobileClasses} z-[9998] opacity-100 translate-y-0`;
    }

      return `${mobileClasses} z-[9998] opacity-0 translate-y-4 pointer-events-none`;

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
  openCategoriesMobile(level:number){
    if(level==0){
      this.mobileHeadCategoriesOpen=false;
      this.mobileCategoriesOpen=false;
      this.mobileSubCategoriesOpen=false;
    }
    if(level==1){
      this.mobileHeadCategoriesOpen=true;
      this.mobileCategoriesOpen=false;
      this.mobileSubCategoriesOpen=false;
    }
    if(level==2){
      this.mobileCategoriesOpen=!this.mobileCategoriesOpen;
      this.mobileHeadCategoriesOpen=false;
      this.mobileSubCategoriesOpen=false;
    }
    if(level==3){
      this.mobileSubCategoriesOpen=!this.mobileSubCategoriesOpen;
      this.mobileCategoriesOpen=false;
      this.mobileHeadCategoriesOpen=false;
    }
  }
  onMobileHeadCategorySelected(headCategoryId:string){
    this.mobileHeadCategoryID=headCategoryId;
   }
    onMobileCategorySelected(categoryId:string){
    this.mobileCategoryID=categoryId;
    }
    onMobileSubCategorySelected(subCategoryId:string){
    this.mobileSubCategoryID=subCategoryId;
    }
    filteredMobileCategories():Category[]{
    return this.categories.filter(cat=>cat.ParentID===this.mobileHeadCategoryID);
  }
  filteredMobileSubCategories():SubCategory[]{
    return this.subCategories.filter(sub=>sub.ParentID===this.mobileCategoryID);
  }

}


