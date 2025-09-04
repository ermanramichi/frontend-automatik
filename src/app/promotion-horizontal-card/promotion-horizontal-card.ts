import { Component, Input } from '@angular/core';
interface Promotion {
  id: number;
  title: string;
  imageUrl: string;
}
@Component({
  selector: 'app-promotion-horizontal-card',
  imports: [],
  templateUrl: './promotion-horizontal-card.html',
  styleUrl: './promotion-horizontal-card.css'
})
export class PromotionHorizontalCard {
  @Input() promotion!: Promotion
}
