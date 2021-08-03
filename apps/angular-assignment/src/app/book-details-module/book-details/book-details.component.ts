import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../shared/books.service';
import { IBook } from '../../_models/book-details';
import { BooksBillingService } from '../../shared/books-billing.service';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  bookDetails!: IBook;
  constructor(
    private bookService: BooksService,
    private router: Router,
    private billingService: BooksBillingService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.bookDetails = this.bookService.bookDetails;
  }

  purchaseBook(): void {
    this.billingService.billedBooks = this.bookDetails;
    this.router.navigate(['/billing-info']);
  }
  navigateToCart(): void {
    this.cartService.cartItems.push(this.bookDetails);
    this.router.navigate(['/cart-items']);
  }
}
