import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Product, Category } from '../../types';
import { ProductService } from '../../services/product.service';

import { ProductDetailsComponent } from './product-details';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule, ProductDetailsComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  isFilterMenuOpen: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.extractCategories();
    });
  }

  extractCategories(): void {
    const categoryNames = new Set<string>();
    this.products.forEach(p => categoryNames.add(p.category.name));
    this.categories = Array.from(categoryNames).map(name => ({ id: name, name: name }));
    this.categories.unshift({ id: 'all', name: 'All' });
  }

  applyFilters(): void {
    let tempProducts = this.products;

    if (this.searchTerm) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCategory && this.selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(product => product.category.name === this.selectedCategory);
    }

    this.filteredProducts = tempProducts;
  }

  toggleFilterMenu(): void {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }
}