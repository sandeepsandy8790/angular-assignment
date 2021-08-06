import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../_components/books.service';
import { IBook } from '../../_models/book-details';
import { BooksBillingService } from '../../billing-module/books-billing.service';
import { CartService } from '../../cart-module/cart.service';

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
    this.bookDetails = this.bookService.getBookDetails();
  }

  purchaseBook(): void {
    this.billingService.setBilledBooks(this.bookDetails);
    this.router.navigate(['/billing-info']);
  }
  navigateToCart(): void {
    this.cartService.setCartItems(this.bookDetails);
    this.router.navigate(['/cart-items']);
  }
}
