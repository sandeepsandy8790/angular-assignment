import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { IBook } from '../_models/book-details';
import { BooksBillingService } from '../billing-module/books-billing.service';

const BOOK: IBook = {
  id: '111',
  volumeInfo: {
    title: 'Angular',
    subtitle: 'Typescript Framework',
    authors: 'XYZ',
    publishedDate: '02-05-2001',
    description: 'testing',
    imageLinks: 'hbdhbfh'
  },
  saleInfo: {
    country: 'India',
    listPrice: '12$'
  }
};

const PURCHASEDBOOK: IBook = {
  id: '222',
  volumeInfo: {
    title: 'Angular',
    subtitle: 'Typescript Framework',
    authors: 'XYZ',
    publishedDate: '02-05-2001',
    description: 'testing',
    imageLinks: 'hbdhbfh'
  },
  saleInfo: {
    country: 'India',
    listPrice: '12$'
  }
};


describe('CartService', () => {
  let service: CartService;
  let billingService: BooksBillingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksBillingService]
    });
    service = TestBed.inject(CartService);
    billingService = TestBed.inject(BooksBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add items to cart when user adds', () => {
    service.setCartItems(BOOK);
    expect(service.cartItems.length).toBe(1);
  });

  it('should return cart items when user navigates to cart', () => {
    service.setCartItems(BOOK);
    service.getCartItems();
    expect(service.cartItems.length).toBe(1);
  });

  it('should remove cart items', () => {
    service.setCartItems(BOOK);
    service.deleteBook(BOOK);
    expect(service.cartItems.length).toEqual(0);
  });

  it('should remove purchased items from cart if item exist', () => {
    service.setCartItems(BOOK);
    billingService.purchasedBooks.push({bookInfo: BOOK});
    service.removeCartItems(billingService.purchasedBooks);
    expect(service.cartItems.length).toEqual(0);
  });

  it('should not remove purchased items from cart if item does not exist', () => {
    service.setCartItems(BOOK);
    billingService.purchasedBooks.push({bookInfo: PURCHASEDBOOK});
    service.removeCartItems(billingService.purchasedBooks);
    expect(service.cartItems.length).toEqual(1);
  });
});
