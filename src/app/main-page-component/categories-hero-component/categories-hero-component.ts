import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CategoryIconMain } from "../../ui-kits/category-icon-main/category-icon-main";
import { SliderWithButtons } from "../../ui-kits/slider-with-buttons/slider-with-buttons";

@Component({
  selector: 'app-categories-hero-component',
  imports: [CategoryIconMain, SliderWithButtons],
  templateUrl: './categories-hero-component.html',
  styleUrl: './categories-hero-component.css'
})
export class CategoriesHeroComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  screenWidth = 0;
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  deviceType = '';
  type='category'
  cardSize=100;


  ngOnInit() {
    this.updateScreenSize();
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
    this.isDesktop = this.screenWidth >= 1024;

    // Set device type for debugging
    if (this.isMobile) this.deviceType = 'Mobile';
    else if (this.isTablet) this.deviceType = 'Tablet';
    else this.deviceType = 'Desktop';
  }

  categories = [
    {
      id:1,
      name:'Phones',
      iconUrl: 'assets/mobile.svg'
    },
    {
      id:2,
      name:'Car Accesories',
      iconUrl: 'assets/car.svg'
    },
    {
      id:3,
      name:'Kitchen Appliances',
      iconUrl: 'assets/kitchen.svg'
    },
    {
      id:4,
      name:'Televisions',
      iconUrl: 'assets/tv.svg'
    },
    {
      id:5,
      name:'Notebooks',
      iconUrl: 'assets/notebooks.svg'
    },
    {
      id:6,
      name:'Decorations',
      iconUrl: 'assets/decoration.svg'
    },
    {
      id:7,
      name:'Fragrances',
      iconUrl: 'assets/fragrances.svg'
    },
    {
      id:8,
      name:'Clothes',
      iconUrl: 'assets/clothes.svg'
    },
  ]
}
