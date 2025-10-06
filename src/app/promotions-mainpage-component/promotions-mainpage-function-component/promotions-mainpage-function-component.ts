import { Component } from '@angular/core';
import { PromotionHorizontalCard } from "../../main-page-component/promotion-horizontal-card/promotion-horizontal-card";

@Component({
  selector: 'app-promotions-mainpage-function-component',
  imports: [PromotionHorizontalCard],
  templateUrl: './promotions-mainpage-function-component.html',
  styleUrl: './promotions-mainpage-function-component.css'
})
export class PromotionsMainpageFunctionComponent {
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
}
