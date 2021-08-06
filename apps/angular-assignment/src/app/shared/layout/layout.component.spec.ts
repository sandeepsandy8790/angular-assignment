import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { CartService } from '../../cart-module/cart.service';
import { BooksBillingService } from '../../billing-module/books-billing.service';
import { IBook } from '../../_models/book-details';

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

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let cartService: CartService;
  let collectionService: BooksBillingService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      providers: [CartService, BooksBillingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    collectionService = TestBed.inject(BooksBillingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title Book Store', () => {
    expect(component.title).toEqual('Book Store');
  });

  it('cart count should be zero when app loads', () => {
    expect(component.cartCount).toEqual(0);
  });

  it('mycollections count should be zero when app loads', () => {
    expect(component.collectionCount).toEqual(0);
  });

  it('cart count should increase when a book added to cart', () => {
    cartService.setCartItems(BOOK);
    component.ngDoCheck();
    expect(component.cartCount).toEqual(1);

  });

  it('cart count should decrease when a book removed from cart', () => {
    cartService.deleteBook(BOOK);
    component.ngDoCheck();
    expect(component.cartCount).toEqual(0);

  });

  it('mycollection count should increase when a book purchased', () => {
    collectionService.purchasedBooks.push(BOOK);
    component.ngDoCheck();
    expect(component.collectionCount).toEqual(1);

  });

  it('cart count should decrease when a book purchased from cart section', () => {
    cartService.removeCartItems(collectionService.purchasedBooks);
    component.ngDoCheck();
    expect(component.cartCount).toEqual(0);

  });
});
