import { HeadCategory, HeadCategoryService } from './../services/head-category-service/head-category-service';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Category, CategoryService } from '../services/category-service/category-service';
import { SubCategoriesService, SubCategory } from '../services/sub-categories-service/sub-categories-service';
import { RouterLink } from '@angular/router';

type MobileLevel = 0 | 1 | 2 | 3;

@Component({
  selector: 'app-dropdown-component',
  imports: [RouterLink],
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.css',
  animations: [
  trigger('slideAnimation', [
    transition(':enter', [
      style({
        transform: '{{ enterTransform }}',
        opacity: 0
      }),
      animate('300ms ease-out',
        style({
          transform: 'translate3d(0,0,0)',
          opacity: 1
        })
      )
    ], { params: { enterTransform: 'translate3d(100%,0,0)' } }),

    transition(':leave', [
      animate('300ms ease-in',
        style({
          transform: '{{ leaveTransform }}',
          opacity: 0
        })
      )
    ], { params: { leaveTransform: 'translate3d(-100%,0,0)' } })
  ])
]
})


export class DropdownComponent implements OnInit, OnChanges {


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
  mobileLevel:MobileLevel=0;
  mobileHeadCategoryID:string='';
  mobileCategoryID:string='';
  mobileSubCategoryID:string='';
  level:number=0;
  animationDirection: 'forward' | 'backward' = 'forward';
  touchStartX: number = 0;
  touchEndX: number = 0
  goToLevel(level:MobileLevel){
    this.animationDirection = level > this.mobileLevel ? 'forward' : 'backward';
    this.mobileLevel = level;
  }
  onTouchStart(event: TouchEvent) {
  this.touchStartX = event.changedTouches[0].screenX;
}

onTouchEnd(event: TouchEvent) {
  this.touchEndX = event.changedTouches[0].screenX;
  this.handleSwipe();
}

handleSwipe() {
  const diff = this.touchEndX - this.touchStartX;

  // swipe right → go back
  if (diff > 50 && this.mobileLevel > 0) {
    this.goToLevel((this.mobileLevel - 1) as MobileLevel);
  }

  // swipe left → go deeper
  if (diff < -50 && this.mobileLevel < 3) {
    this.goToLevel((this.mobileLevel + 1) as MobileLevel);
  }
}
  private resetMobileLevels(): void {
  this.mobileLevel = 0;

  this.mobileHeadCategoryID = '';
  this.mobileCategoryID = '';
  this.mobileSubCategoryID = '';
}
  ngOnChanges(changes: SimpleChanges): void {
  if (changes['dropDownActive'] && changes['dropDownActive'].currentValue === false) {
    this.resetMobileLevels();
  }
}
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
  openCategoriesMobile(level:MobileLevel){
    this.goToLevel(level);
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
  get panelEnabled(): boolean {
    return this.dropDownActive;
  }

}


