import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { HeaderComponent } from "./header-component/header-component";
import { FooterComponent } from "./footer-component/footer-component";
import { FooterNavigatorComponent } from "./footer-component/footer-navigator-component/footer-navigator-component";
import { DropdownComponent } from "./dropdown-component/dropdown-component";





@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, FooterNavigatorComponent, RouterOutlet, DropdownComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void{
     if (isPlatformBrowser(this.platformId)) {
    import('aos').then(AOS => {
      AOS.default.init({
        duration:800,
        easing: 'ease-in-out',
        once:true,
      });
    });
  }

}
 isActive:boolean=false;
 onIsActive(value:boolean){
  this.isActive=value;

 }
 onIsNotActive(){
  this.isActive=false;
 }
}
