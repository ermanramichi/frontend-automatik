import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductPriceService } from '../services/product-price-service/product-price-service';
import { ProductService } from '../services/product-service/product-service';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from '../services/stores-service/stores-service';

@Component({
  selector: 'app-product-details-component',
  imports: [],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId!:string;
  product: any;
  prices: any[]=[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productPriceService: ProductPriceService,
    private storesService: StoresService
  ) { }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
    this.loadPrices();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
      this.loadProduct();
      this.loadPrices();
    }
  }
  loadProduct() {
    this.productService.getProductsById(this.productId).subscribe(products=>{
      this.product=products[0];
    });
  }
  loadPrices() {
    this.productPriceService.getByProductId(this.productId).subscribe(prices=>{
      this.prices=prices;
      this.prices.forEach(price=>{
        this.storesService.getStorebyID(price.StoreID).subscribe(store=>{
          price.storeName=store?.Name;
          price.storeLogoUrl=store?.LogoUrl;
        });
      });
    });
  }
}
