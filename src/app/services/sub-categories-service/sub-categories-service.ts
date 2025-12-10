import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
export interface SubCategory{
  ID:string;
  ParentID:string;
  CustomSubCategoryNameEN:string;
  CustomSubCategoryNameMK:string;
  CustomSubCategoryNameAL:string;
}

@Component({
  selector: 'app-sub-categories-service',
  imports: [],
  templateUrl: './sub-categories-service.html',
  styleUrl: './sub-categories-service.css'
})
@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  private jsonUrl: string = 'assets/SubCategories.json';
  constructor(private http: HttpClient) { }

  getSubCategories() {
    return this.http.get<SubCategory[]>(this.jsonUrl);
  }
}
