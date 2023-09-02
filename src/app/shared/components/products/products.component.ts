import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../models/product.model';
import { SearchService } from '../../search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  products?: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  totalItems = 0;
  filterText = '';
  searchValue = '';

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
      this.filterText = searchValue; // Update the filter text with the search value
      this.filterProducts(); // Apply filtering based on the new search value
    });
  }
}
