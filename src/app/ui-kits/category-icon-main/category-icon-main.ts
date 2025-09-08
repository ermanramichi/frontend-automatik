import { Component, Input } from '@angular/core';
interface Category{
  id:number;
  name:string;
  iconUrl:string;
}
@Component({
  selector: 'app-category-icon-main',
  imports: [],
  templateUrl: './category-icon-main.html',
  styleUrl: './category-icon-main.css'
})
export class CategoryIconMain {
  @Input() category !:Category;
}
