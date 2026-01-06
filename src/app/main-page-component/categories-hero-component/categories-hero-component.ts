import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CategoryIconMain } from "../../ui-kits/category-icon-main/category-icon-main";
import { SliderWithButtons } from "../../ui-kits/slider-with-buttons/slider-with-buttons";
import { CategoriesHeroFunctionComponent } from "./categories-hero-function-component/categories-hero-function-component";
import { HeadCategory, HeadCategoryService } from '../../services/head-category-service/head-category-service';
import { After } from 'v8';


@Component({
  selector: 'app-categories-hero-component',
  imports: [SliderWithButtons, CategoriesHeroFunctionComponent],
  templateUrl: './categories-hero-component.html',
  styleUrl: './categories-hero-component.css'
})
export class CategoriesHeroComponent implements OnInit,AfterViewInit {

  screenWidth = window.innerWidth;
  isMobile = window.innerWidth <= 768;
  isDesktop = window.innerWidth > 768;
  type = 'category';
  cardSize = 100;
  headCategories: HeadCategory[] = [];

  constructor(
    private headCategoryService: HeadCategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.updateScreenSize();
  }

  ngAfterViewInit() {
    this.headCategoryService.getHeadCategories().subscribe(data => {
      this.headCategories = data;
      console.log('Data loaded:', data);
      this.cdr.detectChanges(); // Force change detection after view init
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize();
  }

  private updateScreenSize() {
    this.screenWidth = window.innerWidth;
    this.isMobile = this.screenWidth <= 768;
    this.isDesktop = this.screenWidth > 768;
  }
}
