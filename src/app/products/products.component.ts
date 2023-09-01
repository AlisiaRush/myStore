import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(private productService: ProductService) {}

  products?: IProduct[] = [];

  getProducts() {
    this.productService.getProducts().subscribe(
      (results: IProduct[] | { products: IProduct[] }) => {
        console.log('RESULTS:', results); // Log the results to see their structure

        if (Array.isArray(results)) {
          this.products = results;
        } else if ('products' in results) {
          // Handle the case where results is an object with a 'products' property
          this.products = results.products;
        } else {
          console.error('Unexpected data format:', results);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
