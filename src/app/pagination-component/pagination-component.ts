import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination-component.html',
  standalone: true
})
export class PaginationComponent implements OnChanges {

  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() pageSize = 12;
  @Input() maxPagesToShow = 5; // Number of page buttons to show (default 5 for better UX)

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxPages = this.maxPagesToShow;

    if (total <= maxPages) {
      // Show all pages if total is less than max
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range = Math.floor(maxPages / 2);
    let start = Math.max(1, current - range);
    let end = Math.min(total, current + range);

    // Adjust if we're near the beginning or end
    if (current <= range) {
      end = maxPages;
    } else if (current >= total - range) {
      start = total - maxPages + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  get showFirstPage(): boolean {
    return this.pages[0] > 1;
  }

  get showLastPage(): boolean {
    return this.pages[this.pages.length - 1] < this.totalPages;
  }

  get hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  get hasNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Validate currentPage when inputs change
    if (changes['totalItems'] || changes['pageSize']) {
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.goToPage(this.totalPages);
      }
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.pageChange.emit(page);
    this.scrollToTop();
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  goToPrevious(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNext(): void {
    this.goToPage(this.currentPage + 1);
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Helper for template to check if page is current
  isCurrentPage(page: number): boolean {
    return page === this.currentPage;
  }
}