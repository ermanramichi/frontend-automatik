import { Component } from '@angular/core';
import { PromotionHorizontalCard } from "../promotion-horizontal-card/promotion-horizontal-card";

@Component({
  selector: 'app-promotions-mainpage-component',
  imports: [PromotionHorizontalCard],
  templateUrl: './promotions-mainpage-component.html',
  styleUrl: './promotions-mainpage-component.css'
})
export class PromotionsMainpageComponent {
  promotions=[
    {
      id:1,
      title:'Back to School Sale',
      imageUrl:'assets/promotion1.png'
    },
    {
      id:2,
      title:'Summer Clearance Event',
      imageUrl:'assets/promotion2.png'
    },
     {
      id:3,
      title:'Back to School Sale',
      imageUrl:'assets/promotion1.png'
    },
    {
      id:4,
      title:'Summer Clearance Event',
      imageUrl:'assets/promotion2.png'
    }
  ]


scrollRight(slider: HTMLElement): void {
    slider.scrollBy({
      left: 500,
      behavior: 'smooth'
    });
  }

  scrollLeft(slider: HTMLElement): void {
    slider.scrollBy({
      left: -500,
      behavior: 'smooth'
    });
  }
}
