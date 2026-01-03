import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
export interface HeadCategory {
  ID: string;
  CustomHeadCategoryNameEN: string;
  CustomHeadCategoryNameMK: string;
  CustomHeadCategoryNameAL: string;
  imageUrl: string;
}

@Component({
  selector: 'app-head-category-service',
  imports: [],
  templateUrl: './head-category-service.html',
  styleUrl: './head-category-service.css'
})
  @Injectable({
  providedIn: 'root'
})
export class HeadCategoryService {
  private jsonUrl: string = 'assets/HeadCategories.json';
  constructor(private http: HttpClient) { }

  getHeadCategories() {
    return this.http.get<HeadCategory[]>(this.jsonUrl);
  }
}
