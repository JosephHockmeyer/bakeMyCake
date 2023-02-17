import { Component, Input } from '@angular/core';
import { Cake } from '../models/cake';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  cake?: Cake;
  showActions: boolean = false;

  displayActions() {
    this.showActions = !this.showActions;
  }
}
