import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { MainPageComponent } from './main-page-component/main-page-component';
import { StoresListingComponent } from './stores-listing-component/stores-listing-component';
import { ProductDetailsComponent } from './product-details-component/product-details-component';
import { ProductsComponent } from './products-component/products-component';


export const routes: Routes = [
{ path: '', component: MainPageComponent },
{ path:'home', component: MainPageComponent },
{ path:'stores', component: StoresListingComponent},
{ path:'product/:id', component: ProductDetailsComponent},
{path:'products', component:ProductsComponent}
];

