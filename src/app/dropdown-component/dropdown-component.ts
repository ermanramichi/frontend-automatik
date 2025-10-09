import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MainCategoriesComponent } from "../categories/main-categories-component/main-categories-component";

@Component({
  selector: 'app-dropdown-component',
  imports: [MainCategoriesComponent],
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.css'
})
export class DropdownComponent implements OnInit{
  @Input() dropDownActive!:boolean;
  @Output() notActive = new EventEmitter<boolean>();
  screenWidth = 0;
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  isLargeDesktop=false;
  deviceType = '';



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
  get baseClasses():string{

    if(this.isMobile){
      const baseClasses = 'drop-down w-full h-fit bg-white fixed top-32 py-2 left-0 flex items-start justify-start shadow-xl transition-all duration-300 ease-in-out';
      if (this.dropDownActive) {
      return `${baseClasses} z-[9998] opacity-100 translate-y-0`;
    }

      return `${baseClasses} z-[9998] opacity-0 translate-y-4 pointer-events-none`;

    }
    const baseClasses = 'drop-down w-[1400px] h-[500px] bg-white fixed top-24 left-60 flexs items-start justify-start shadow-xl transition-all duration-300 ease-in-out rounded-b-xl';
      if (this.dropDownActive) {
      return `${baseClasses} z-[9998] opacity-100 translate-y-0`;
    }

      return `${baseClasses} z-[9998] opacity-0 translate-y-4 pointer-events-none`;

  


}
  closeDropdown(){
    this.notActive.emit(false);
  }
}


