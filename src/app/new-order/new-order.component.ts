import { Component, Output, EventEmitter } from '@angular/core';
import { Cake } from '../models/cake';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent {
  cake: Cake = {};
  @Output()
  orderAdded: EventEmitter<Cake> = new EventEmitter<Cake>();

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  addOrder(form: any) {
    console.log(form.value);
    if (!this.cake.product || !this.cake.quantity) {
      return alert('You must put a product name and quantity!');
    }
    if (this.cake)
      if (this.cake.id !== 0 && this.cake.product !== '') {
        return this.productService.addOrder(this.cake).subscribe({
          next: (data: any) => {
            this.orderAdded.emit(this.cake);
            this.cake = {};
            this._snackBar.open('Order added successfully!', 'success', {
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary'],
            });
            form.resetForm();
          },
          error: (e: any) => {
            this._snackBar.open(
              'An error occurred! Could not add order. Please try again later',
              'failure',
              {
                duration: 5000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              }
            );
          },
        });
      }
  }
}
