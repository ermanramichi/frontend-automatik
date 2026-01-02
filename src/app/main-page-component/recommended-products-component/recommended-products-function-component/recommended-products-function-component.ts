import { Product, ProductService } from './../../../services/product-service/product-service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductCardComponent } from "../../product-card-component/product-card-component";

@Component({
  selector: 'app-recommended-products-function-component',
  imports: [ProductCardComponent],
  templateUrl: './recommended-products-function-component.html',
  styleUrl: './recommended-products-function-component.css'
})
export class RecommendedProductsFunctionComponent {
    products:Product[]=[];
    constructor(
      private productService:ProductService,
      private cdr:ChangeDetectorRef
    ){}

    ngOnInit():void{
      this.loadProducts();
    }
   loadProducts() {
    this.productService.getProductsWithMinimumPrice().subscribe(products => {
      this.products=products;
      this.cdr.detectChanges();
      console.log(this.products);
    });
  }
  recommendedProductsOnly(){
    return this.products.filter(product => product.isRecommended===true)
  }



}
