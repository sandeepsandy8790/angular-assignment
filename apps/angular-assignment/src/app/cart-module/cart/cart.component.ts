import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { IBook } from '../../_models/book-details';
import { BooksBillingService } from '../../billing-module/books-billing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems!: IBook[];
  constructor(
    private cartService: CartService,
    private billingService: BooksBillingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  deleteBook(item: IBook): void {
    this.cartService.deleteBook(item);
  }

  purchaseBook(item: IBook): void {
    this.billingService.setBilledBooks(item);
    this.router.navigate(['/billing-info']);
  }
}
