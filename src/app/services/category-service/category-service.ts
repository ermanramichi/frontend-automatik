import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
export interface Category{
  ID:string;
  ParentID:string;
  CustomCategoryNameEN:string;
  CustomCategoryNameMK:string;
  CustomCategoryNameAL:string;
}
@Component({
  selector: 'app-category-service',
  imports: [],
  templateUrl: './category-service.html',
  styleUrl: './category-service.css'
})
 @Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private jsonUrl: string = 'assets/Categories.json';
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.jsonUrl);
  }
}
