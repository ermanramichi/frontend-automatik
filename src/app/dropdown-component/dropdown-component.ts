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
        style({ transform: '{{ enterTransform }}', opacity: 0.4 }),
        animate('420ms cubic-bezier(0.22, 1, 0.36, 1)', style({ transform: 'translate3d(0,0,0)', opacity: 1 }))
      ], { params: { enterTransform: 'translate3d(100%,0,0)' } }),
      transition(':leave', [
        animate('420ms cubic-bezier(0.22, 1, 0.36, 1)', style({ transform: '{{ leaveTransform }}', opacity: 0 }))
      ], { params: { leaveTransform: 'translate3d(-100%,0,0)' } })
    ])
  ]
})
export class DropdownComponent implements OnInit, OnChanges {

  constructor(
    private headCategoryService: HeadCategoryService,
    private categoryService: CategoryService,
    private subCategoriesService: SubCategoriesService
  ) {}

  @Input() dropDownActive!: boolean;
  @Output() notActive = new EventEmitter<boolean>();

  selectedCategoryId: string = 'HC01';
  headCategories: HeadCategory[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  isDesktop = false;
  isMobile = false;
  screenwidth = 0;

  // mobile navigation
  mobileLevel: MobileLevel = 0;
  mobileHeadCategoryID: string = '';
  mobileCategoryID: string = '';
  mobileSubCategoryID: string = '';
  animationDirection: 'forward' | 'backward' = 'forward';

  // swipe
  touchStartX: number = 0;
  touchEndX: number = 0;

  // --------------------
  // Lifecycle hooks
  // --------------------
  ngOnInit(): void {
    this.updateScreenSize();
    this.headCategoryService.getHeadCategories().subscribe(data => this.headCategories = data);
    this.categoryService.getCategories().subscribe(data => this.categories = data);
    this.subCategoriesService.getSubCategories().subscribe(data => this.subCategories = data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dropDownActive'] && !changes['dropDownActive'].currentValue) {
      this.resetMobileLevels();
    }
  }

  // --------------------
  // Screen resize
  // --------------------
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize();
  }

  private updateScreenSize() {
    this.screenwidth = window.innerWidth;
    this.isMobile = this.screenwidth < 768;
    this.isDesktop = this.screenwidth >= 768;
  }

  // --------------------
  // Mobile menu level control
  // --------------------
  goToLevel(level: MobileLevel) {
    this.animationDirection = level > this.mobileLevel ? 'forward' : 'backward';
    this.mobileLevel = level;
  }

  private resetMobileLevels(): void {
    this.mobileLevel = 0;
    this.mobileHeadCategoryID = '';
    this.mobileCategoryID = '';
    this.mobileSubCategoryID = '';
  }

  // --------------------
  // Mobile swipe handlers
  // --------------------
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const diff = this.touchEndX - this.touchStartX;
    const SWIPE_THRESHOLD = 50;

    // swipe right → back
    if (diff > SWIPE_THRESHOLD && this.mobileLevel > 0) {
      this.goToLevel((this.mobileLevel - 1) as MobileLevel);
    }

    // swipe left → forward only if next level exists
    if (diff < -SWIPE_THRESHOLD) {
      if (this.mobileLevel === 0 && this.mobileHeadCategoryID) this.goToLevel(1);
      if (this.mobileLevel === 1 && this.mobileCategoryID) this.goToLevel(2);
      if (this.mobileLevel === 2 && this.mobileSubCategoryID) this.goToLevel(3);
    }
  }

  // --------------------
  // Desktop helpers
  // --------------------
  get desktopClasses(): string {
    const base = 'drop-down w-full max-w-[1400px] min-h-[300px] h-fit bg-white fixed top-24 left-1/2 -translate-x-1/2 flex items-start justify-start shadow-xl transition-all duration-300 ease-in-out rounded-b-xl';
    return this.dropDownActive ? `${base} z-[9998] opacity-100 translate-y-0` : `${base} z-[9998] opacity-0 translate-y-4 pointer-events-none`;
  }

  get mobileClasses(): string {
    const base = 'drop-down w-full h-full bg-white fixed top-26 p-4 left-0 flex flex-col items-start justify-start shadow-xl rounded-b-xl';
    return this.dropDownActive ? `${base} z-[9998] opacity-100 translate-y-0` : `${base} z-[9998] opacity-0 translate-y-4 pointer-events-none`;
  }

  // --------------------
  // Desktop category selection
  // --------------------
  onCategorySelected(categoryId: string) {
    this.selectedCategoryId = categoryId;
  }

  filteredCategories(): Category[] {
    return this.categories.filter(cat => cat.ParentID === this.selectedCategoryId);
  }

  filteredSubCategories(categoryId: string): SubCategory[] {
    return this.subCategories.filter(sub => sub.ParentID === categoryId);
  }

  // --------------------
  // Mobile category selection
  // --------------------
  openCategoriesMobile(level: MobileLevel) {
    this.goToLevel(level);
  }

  onMobileHeadCategorySelected(headCategoryId: string) {
    this.mobileHeadCategoryID = headCategoryId;
    this.mobileCategoryID = '';
    this.mobileSubCategoryID = '';
    this.goToLevel(2); // open categories
  }

  onMobileCategorySelected(categoryId: string) {
    this.mobileCategoryID = categoryId;
    this.mobileSubCategoryID = '';
    this.goToLevel(3); // open subcategories
  }

  onMobileSubCategorySelected(subCategoryId: string) {
    this.mobileSubCategoryID = subCategoryId;
  }

  filteredMobileCategories(): Category[] {
    return this.categories.filter(cat => cat.ParentID === this.mobileHeadCategoryID);
  }

  filteredMobileSubCategories(): SubCategory[] {
    return this.subCategories.filter(sub => sub.ParentID === this.mobileCategoryID);
  }

  // inside DropdownComponent class

closeDropdown() {
  // emit event to parent
  this.notActive.emit(false);

  // reset all mobile navigation levels
  this.resetMobileLevels();
}
}