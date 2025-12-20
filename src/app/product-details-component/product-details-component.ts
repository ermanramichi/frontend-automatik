import { Head } from './../../../node_modules/rxjs/src/internal/types';
import { SubCategoriesService } from './../services/sub-categories-service/sub-categories-service';
import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductPriceService } from '../services/product-price-service/product-price-service';
import { ProductService } from '../services/product-service/product-service';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from '../services/stores-service/stores-service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { concat } from 'rxjs';

@Component({
  selector: 'app-product-details-component',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null = null;
  product: any;
  prices: any[]=[];
  crossSaleSubCategories: any[]=[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productPriceService: ProductPriceService,
    private storesService: StoresService,
    private cdr: ChangeDetectorRef,
    private SubCategoriesService: SubCategoriesService
  ) { }
  
  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.productId = id;
      this.product = null; 
      this.prices = [];
      this.loadProduct();
      this.loadPrices();
      this.getCrossSaleSubCategories(this.productId);
    }
  });
}
  
  loadProduct() {
    this.productService.getProductsById(this.productId!).subscribe({
    next:(data)=>{
      this.product=data[0];
      this.cdr.detectChanges();
      console.log(this.product);
    },
    error:(err)=>{
      console.error('Error fetching product details:', err);
    }
  });  
  }
  
  loadPrices() {
  this.productPriceService.getByProductId(this.productId!).subscribe(prices => {
    
    this.prices = prices;
    console.log(this.prices);
  
    this.prices.forEach((price, index) => {
      this.storesService.getStorebyID(price.StoreID).subscribe(store => {
        price.storeName = store?.Name;
        price.storeLogoUrl = store?.LogoUrl;
        this.cdr.detectChanges();
        
        this.prices = [...this.prices];
      });
    });
  });
}
getStars(rating: number): number[] {
  return Array(5)
    .fill(0)
    .map((_, i) => i < rating ? 1 : 0);
}
getCrossSaleSubCategories(productId: string): void {
  this.productService.getProductsById(productId).subscribe(products => {
    const productByID= products[0];
    if (!productByID) return;
    const categoryID = productByID.HeadCategoryID+productByID.CategoryID;
    console.log('Category ID for cross-sale:', categoryID);

    this.SubCategoriesService.getSubCategories().subscribe(subcategories => {
      this.crossSaleSubCategories = subcategories.filter(sub =>
        sub.ParentID === categoryID &&
        sub.ID !== productByID.SubCategoryID
        
      );
      this.cdr.detectChanges();
      console.log(this.crossSaleSubCategories);
    });
  });
}}
