import { HeadCategory } from './../services/head-category-service/head-category-service';
// Component TypeScript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-for-products.html',
  styleUrls: ['./filter-for-products.css']
})
export class FilterForProductsComponent {
  isFilterOpen = false;
  
  // Your existing filter properties
  @Input() headcategories:HeadCategory[] | undefined;
  minValue = 0;
  maxValue = 1000;
  min = 0;
  max = 1000;
  step = 10;
  gap = 10;

  get leftPercent(): number {
    return ((this.minValue - this.min) / (this.max - this.min)) * 100;
  }

  get rangeWidth(): number {
    return ((this.maxValue - this.minValue) / (this.max - this.min)) * 100;
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
    
    // Prevent body scroll when overlay is open
    if (this.isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeFilter(): void {
    this.isFilterOpen = false;
    document.body.style.overflow = '';
  }

  applyFilters(): void {
    // Apply your filter logic here
    console.log('Filters applied:', {
      minPrice: this.minValue,
      maxPrice: this.maxValue
    });
    this.closeFilter();
  }

  onMinChange(): void {
    if (this.maxValue - this.minValue < this.gap) {
      this.minValue = this.maxValue - this.gap;
    }
  }

  onMaxChange(): void {
    if (this.maxValue - this.minValue < this.gap) {
      this.maxValue = this.minValue + this.gap;
    }
  }
}