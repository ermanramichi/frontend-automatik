import { HeadCategory, HeadCategoryService } from './../services/head-category-service/head-category-service';
import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { Product, ProductService } from '../services/product-service/product-service';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from "../pagination-component/pagination-component";
import { FilterForProductsComponent } from "../filter-for-products/filter-for-products";
import { ProductPrice, ProductPriceService } from '../services/product-price-service/product-price-service';

import { ProductCardComponent } from "../main-page-component/product-card-component/product-card-component";


@Component({
  selector: 'app-products-component',
  imports: [FormsModule, PaginationComponent, FilterForProductsComponent, ProductCardComponent],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  headcategories: HeadCategory[]= [];
  min = 0;
  max = 2000;
  step=10;
  gap=10;
  minValue=0;
  maxValue=2000;
  currentPage=1;
  pageSize=12;
  totalProducts=0;
  productID:string='PR01'
  prices:ProductPrice[]=[];

  onMinChange(){
    this.minValue=Math.min(this.minValue,this.maxValue - this.gap);
  }
  onMaxChange(){
    this.maxValue=Math.max(this.maxValue,this.minValue + this.gap);
  }
  get leftPercent(){
    return ((this.minValue - this.min) / (this.max - this.min)) * 100;
  }
  get rightPercent(){
    return ((this.maxValue - this.min) / (this.max - this.min)) * 100;
  }
  get rangeWidth(){
    return this.rightPercent - this.leftPercent;
  }


  constructor(
    private HeadCategoryService: HeadCategoryService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private productPricesService:ProductPriceService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadHeadCategories();
    this.loadPrices();

  }
  onPageChange(page:number):void{
    this.currentPage=page;
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductsByPage(this.currentPage,this.pageSize).subscribe(response => {
      this.products = response.products;
      this.totalProducts = response.totalItems;
      this.cdr.detectChanges();
      console.log(this.products);
    });
  }
  loadHeadCategories() {
    this.HeadCategoryService.getHeadCategories().subscribe(headcategories => {
      this.headcategories = headcategories;
      this.cdr.detectChanges();
      console.log(this.headcategories);
    });
  }
  loadPrices(){
    this.productPricesService.getAllPrices().subscribe(prices=>{
      this.prices=prices;
      this.cdr.detectChanges();
    })
    }

}
