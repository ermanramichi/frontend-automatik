import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { DropdownComponent } from "../dropdown-component/dropdown-component";
import {  } from 'stream';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  clickedMobile=false;
  clickedSearch=false;
  selectedPage='home';
  isMobile = false;
  isDesktop = false;
  screenWidth = 0;
  clicked=false;
  dropdownOpen = false;
  dropDownMobileOpen=false;
  @Output() isActive = new EventEmitter<boolean>();
  private mouseOutTimeout: any;
   ngOnInit() {
    this.updateScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize();
  }
  private updateScreenSize() {
    this.screenWidth = window.innerWidth;
    this.isMobile = this.screenWidth < 768;
    this.isDesktop = this.screenWidth >= 768;
  }
  onClick(id: string) {
    this.selectedPage = id;


    if (id === 'categories') {
      this.dropdownOpen = true;
      this.isActive.emit(this.dropdownOpen);
      this.dropDownMobileOpen=false;
    } else {
      this.dropdownOpen = false;
      this.isActive.emit(this.dropdownOpen);
    }
  }
  onHover(){
    if (this.mouseOutTimeout) {
      clearTimeout(this.mouseOutTimeout);
      this.mouseOutTimeout = null;
    }

    this.dropdownOpen = true;
    this.isActive.emit(this.dropdownOpen);
  }

  ngOnDestroy() {
    if (this.mouseOutTimeout) {
      clearTimeout(this.mouseOutTimeout);
    }
  }

  triggerMobile(){
    this.clickedMobile=!this.clickedMobile;
  }
  onSearchClick(){
    this.clickedSearch=!this.clickedSearch;
  }
  searchClasses():string{
    if(this.clickedSearch){
      return 'searchbar h-10 w-full flex justify-center items-center text-xm text-bluematik p-1 hover:p-3 mx-4 transition-all duration-300 hover:w-72 focus-within:w-full  hover:shadow-lg  hover:border-b-2 border-bluematik';
    }
    else{
      return 'searchbar h-10 w-10 flex justify-center items-center text-xm text-bluematik p-1 hover:p-3 mx-4 transition-all duration-300 hover:w-72 focus-within:w-full  hover:shadow-lg  hover:border-b-2 border-bluematik';
    }
  }
  dropDownClasses():string{
    const baseClasses = 'drop-down w-full h-fit bg-white fixed top-32 p-4 left-0 flex flex-col items-start justify-start shadow-xl transition-all duration-300 ease-in-out';
    if(this.dropDownMobileOpen){
      return `${baseClasses} z-[9999] opacity-100 translate-y-0`;
    }
    return `${baseClasses} z-[9998] opacity-0 translate-y-4 pointer-events-none`;
  }
  onHamburgerClick(){
    this.dropDownMobileOpen=!this.dropDownMobileOpen;
    this.dropdownOpen=false;
    this.isActive.emit(this.dropdownOpen);
  }

  iconHamburgerSource():string{
    if(this.dropDownMobileOpen){
      return 'assets/close.svg';
    }
    return 'assets/3-lines.svg';
  }
}
