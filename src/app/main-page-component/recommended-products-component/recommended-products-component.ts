import { Component } from '@angular/core';

@Component({
  selector: 'app-recommended-products-component',
  imports: [],
  templateUrl: './recommended-products-component.html',
  styleUrl: './recommended-products-component.css'
})
export class RecommendedProductsComponent {

  products=[
    {
      id: 1,
      name: 'Iphone 14 Pro Max',
      description: 'Latest model with advanced features',
      price: 999,
      imageUrl: 'assets/iphone.jpg',
      discountedPrice: 299,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      description: 'High performance smartphone',
      price: 499,
      imageUrl: 'assets/samsung.png',
      discountedPrice: 249
    },
    {
      id: 3,
      name: 'Google Pixel 6',
      description: 'Pure Android experience',
      price: 699,
      imageUrl: 'assets/googlepixel.jpg',
      discountedPrice: 599
    },
    {
      id: 4,
      name: 'OnePlus 9',
      description: 'Fast and smooth performance',
      price: 749,
      imageUrl: 'assets/oneplus.png',
      discountedPrice: 699
    },
    {
      id: 5,
      name: 'Iphone 14 Pro Max',
      description: 'Latest model with advanced features',
      price: 600,
      imageUrl: 'assets/iphone.jpg',
      discountedPrice: 200
    },
    {
      id: 6,
      name: 'Iphone 14 Pro Max',
      description: 'Latest model with advanced features',
      price: 870,
      imageUrl: 'assets/iphone.jpg',
      discountedPrice: 450
    },
    {
      id: 7,
      name: 'Iphone 14 Pro Max',
      description: 'Latest model with advanced features',
      price: 999,
      imageUrl: 'assets/iphone.jpg',
      discountedPrice: 650
    },
  ]
  getPercentageDiscount(originalPrice: number, discountedPriceedPrice: number):number{
    const percentage= ((originalPrice - discountedPriceedPrice) / originalPrice) * 100;
    return Math.round(percentage);
  }
  scrollRight(slider: HTMLElement): void {
    slider.scrollBy({
      left: 316,
      behavior: 'smooth'
    });
  }

  scrollLeft(slider: HTMLElement): void {
    slider.scrollBy({
      left: -316,
      behavior: 'smooth'
    });
  }

}
