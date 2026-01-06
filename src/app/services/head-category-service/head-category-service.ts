import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

export interface HeadCategory {
  ID: string;
  CustomHeadCategoryNameEN: string;
  CustomHeadCategoryNameMK: string;
  CustomHeadCategoryNameAL: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeadCategoryService {
  private jsonUrl: string = 'assets/HeadCategories.json';
  private headCategories$: Observable<HeadCategory[]>;

  constructor(private http: HttpClient) {
    // Create cached observable that shares the same HTTP request
    this.headCategories$ = this.http.get<HeadCategory[]>(this.jsonUrl).pipe(
      shareReplay(1) // Cache the last result
    );
  }

  getHeadCategories(): Observable<HeadCategory[]> {
    return this.headCategories$;
  }
}
