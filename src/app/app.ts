import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from "./header-component/header-component";
import { MainComponent } from "./main-component/main-component";
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, MainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
    

  ngAfterViewInit(): void{
     if (isPlatformBrowser(this.platformId)) {
    import('aos').then(AOS => {
      AOS.init({
        duration:800,
        easing: 'ease-out',
        
      });
    });
  }
  
}
}
