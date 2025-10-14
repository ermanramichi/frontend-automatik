import { Component, HostListener, Input, OnInit } from '@angular/core';
interface Category{
  id:number;
  name:string;
  iconUrl:string;
}
@Component({
  selector: 'app-category-icon-main',
  imports: [],
  templateUrl: './category-icon-main.html',
  styleUrl: './category-icon-main.css'
})
export class CategoryIconMain implements OnInit {
  @Input() category !:Category;
  screenWidth = 0;
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  isLargeDesktop=false;
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
    this.isDesktop = this.screenWidth >= 1024 && this.screenWidth<1920;
    this.isLargeDesktop=this.screenWidth>=1920;

    // Set device type for debugging
    if (this.isMobile) this.deviceType = 'Mobile';
    else if (this.isTablet) this.deviceType = 'Tablet';
    else this.deviceType = 'Desktop';
  }
  get iconClasses(): string {
    if(this.isMobile) {return `${this.category.iconUrl} text-bluematik fa-2x`;}
    return `${this.category.iconUrl} text-bluematik fa-3x`;}
}
