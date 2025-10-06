import { Component, Input } from '@angular/core';
import { Button } from "../../ui-kits/button/button";
interface Promotion {
  id: number;
  title: string;
  imageUrl: string;
}
@Component({
  selector: 'app-promotion-horizontal-card',
  imports: [Button],
  templateUrl: './promotion-horizontal-card.html',
  styleUrl: './promotion-horizontal-card.css'
})
export class PromotionHorizontalCard {
  @Input() promotion!: Promotion
}
