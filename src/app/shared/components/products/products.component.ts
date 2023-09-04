import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IProduct } from '../../../models/product.model';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent } from '../pagination/pagination.component';
import { ProductService } from '../../services/product/product.service';
import { SearchService } from '../../services/search/search.service';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private paginationService: PaginationService
  ) {}

  products?: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  totalItems = 0;
  filterText = '';
  searchValue = '';

  pageSize = 10; // Initialize with a default page size

  getProducts() {
    this.productService
      .getProducts()
      .subscribe((results: IProduct[] | { products: IProduct[] }) => {
        if (Array.isArray(results)) {
          this.products = results;
        } else {
          this.products = results.products;
          this.totalItems = this.products.length;
        }

        // Initialize filteredProducts to the full list of products
        this.filteredProducts = this.products;
      });
  }

  filterProducts() {
    if (!this.filterText || this.filterText.trim() === '') {
      // If the filter text is empty or contains only whitespace, show all products
      this.filteredProducts = this.products || [];
    } else {
      // Filter products based on the filter text
      this.filteredProducts = (this.products || []).filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.filterText.toLowerCase());
      });
    }
  }

  ngOnInit(): void {
    this.getProducts();

    // Subscribe to searchValue$ observable
    this.searchService.searchValue$.subscribe((searchValue) => {
      this.filterText = searchValue;
      this.filterProducts();
    });

    // Subscribe to pageSize$ to get the current page size
    this.paginationService.pageSize$.subscribe((pageSize) => {
      this.pageSize = pageSize; // Update the page size
      this.filterProducts();
    });
  }
}
