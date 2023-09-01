import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products?: IProduct[] = [];
  totalItems = 0;

  getProducts() {
    this.productService
      .getProducts()
      .subscribe((results: IProduct[] | { products: IProduct[] }) => {
        // console.log('RESULTS:', results);

        if (Array.isArray(results)) {
          this.products = results;
          alert('array');
        } else {
          this.products = results.products;
          this.totalItems = this.products.length;
        }
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
