import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cake } from '../models/cake';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  cakes: Cake[] = [];
  addingOrder: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getOrders().subscribe({
      next: (data) => {
        this.cakes = data;
      },
      error: (e) => {
        alert('An error occurred fetching data.');
      },
    });
  }

  onSearchTextChanged(searchText: string) {
    this.productService.getOrders().subscribe({
      next: (data: any) => {
        this.cakes = data.filter((cake: Cake) =>
          cake?.product?.includes(searchText)
        );
      },
      error: (e: any) => {
        alert('A problem occurred fetching products from the server!');
      },
    });
  }

  openAddOrderPanel() {
    this.addingOrder = !this.addingOrder;
  }

  onOrderAdded(cake: Cake) {
    if (cake) this.cakes.push(cake);
  }
}
