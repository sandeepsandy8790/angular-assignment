import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  DoCheck,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BooksBillingService } from '../../billing-module/books-billing.service';
import { CartService } from '../../cart-module/cart.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, DoCheck {
  title = 'Book Store';
  opened = true;
  cartCount!: number;
  collectionCount!: number;
  constructor(
    private BillingService: BooksBillingService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {}
  ngDoCheck(): void {
    this.cartCount = this.cartService.cartItems.length;
    this.collectionCount = this.BillingService.purchasedBooks.length;
  }
}
