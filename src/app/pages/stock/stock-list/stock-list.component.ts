import { Component, OnInit } from '@angular/core';
import { Stock } from '../../../models/stock';
import { StockService } from '../../../services/stock.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stock-list',
  imports: [CommonModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css',
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  paginatedStocks: Stock[] = [];

  currentPage = 1;
  itemPerPage = 10;
  totalPages = 0;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.getAllStocks();
  }

  getAllStocks(): void {
    this.stockService.getAllStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.totalPages = Math.ceil(this.stocks.length / this.itemPerPage);
        this.updatePage();
      },
      error: (err) => {
        console.log('Error Fetching Stocks', err);
      },
    });
  }

  //! Pagination
  updatePage(): void {
    const start = (this.currentPage - 1) * this.itemPerPage;
    this.paginatedStocks = this.stocks.slice(start, start + this.itemPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }
}
