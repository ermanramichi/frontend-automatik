import { Component } from '@angular/core';

import { SliderWithButtons } from "../ui-kits/slider-with-buttons/slider-with-buttons";

@Component({
  selector: 'app-promotions-mainpage-component',
  imports: [SliderWithButtons],
  templateUrl: './promotions-mainpage-component.html',
  styleUrl: './promotions-mainpage-component.css'
})
export class PromotionsMainpageComponent {

  type='promotion'
  cardSize=600;


}
