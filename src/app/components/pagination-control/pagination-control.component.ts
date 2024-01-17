import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-pagination-control",
  templateUrl: "./pagination-control.component.html",
})
export class PaginationControlComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Output() pageChanged = new EventEmitter<number>();
  currentPage = 1;

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): Array<number> {
    const pagesToShow = 5; // Total de páginas a serem exibidas
    let startPage: number, endPage: number;

    if (this.totalPages <= pagesToShow) {
      // Menos páginas do que o total a ser exibido
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // Calcular páginas iniciais e finais
      const maxPagesBeforeCurrentPage = Math.floor(pagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(pagesToShow / 2) - 1;
      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
        startPage = this.totalPages - pagesToShow + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - maxPagesBeforeCurrentPage;
        endPage = this.currentPage + maxPagesAfterCurrentPage;
      }
    }
    return Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
