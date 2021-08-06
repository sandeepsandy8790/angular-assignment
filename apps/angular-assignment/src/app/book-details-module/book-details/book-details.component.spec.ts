import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IBook } from '../../_models/book-details';
import { BooksBillingService } from '../../billing-module/books-billing.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart-module/cart.service';

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

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let billService: BooksBillingService;
  let cartService: CartService;
  const MOCKROUTER = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BooksBillingService, CartService, {provide: Router, useValue: MOCKROUTER}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    billService = TestBed.inject(BooksBillingService);
    cartService = TestBed.inject(CartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display complete book details when page loads', () => {
    component.bookDetails = BOOK;
    expect(component.bookDetails).toEqual(BOOK);
  });

  it('should redirect to billing page when user clicks on buy now button and store the data for further usage', () => {
    component.purchaseBook();
    billService.setBilledBooks(BOOK);
    expect(MOCKROUTER.navigate).toHaveBeenCalledWith(['/billing-info']);
  });

  it('should add item to cart and redirect to cart page when user clicks on addtocart button and store the data for further usage', () => {
    component.navigateToCart();
    cartService.setCartItems(BOOK);
    expect(cartService.cartItems.length).toBeGreaterThanOrEqual(1);
    expect(MOCKROUTER.navigate).toHaveBeenCalledWith(['/cart-items']);
  });
});
