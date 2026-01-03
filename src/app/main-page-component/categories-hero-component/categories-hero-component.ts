import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CategoryIconMain } from "../../ui-kits/category-icon-main/category-icon-main";
import { SliderWithButtons } from "../../ui-kits/slider-with-buttons/slider-with-buttons";
import { CategoriesHeroFunctionComponent } from "./categories-hero-function-component/categories-hero-function-component";
import { HeadCategory, HeadCategoryService } from '../../services/head-category-service/head-category-service';
import { Head } from 'rxjs';

@Component({
  selector: 'app-categories-hero-component',
  imports: [CategoryIconMain, SliderWithButtons, CategoriesHeroFunctionComponent],
  templateUrl: './categories-hero-component.html',
  styleUrl: './categories-hero-component.css'
})
export class CategoriesHeroComponent implements OnInit{

  screenWidth = 0;
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  isLargeDesktop=false;
  deviceType = '';
  type='category'
  cardSize=100;
  headcategories:HeadCategory[]=[];

  constructor(private headCategoryService: HeadCategoryService) {}
  ngOnInit() {
    this.updateScreenSize();
    this.headCategoryService.getHeadCategories().subscribe((categories) => {
      this.headcategories = categories;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize();
  }

  private updateScreenSize() {
    this.screenWidth = window.innerWidth;

    // Define breakpoints
    this.isMobile = this.screenWidth < 768;
    this.isTablet = this.screenWidth >= 768 && this.screenWidth < 1024;
    this.isDesktop = this.screenWidth >= 1024 && this.screenWidth<1920;
    this.isLargeDesktop=this.screenWidth>=1920;

    // Set device type for debugging
    if (this.isMobile) this.deviceType = 'Mobile';
    else if (this.isTablet) this.deviceType = 'Tablet';
    else this.deviceType = 'Desktop';
  }


}
