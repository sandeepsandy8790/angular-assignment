import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../cart.service';
import { IBook } from '../../_models/book-details';
import { Router } from '@angular/router';

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

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;
  const MOCKROUTER = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [RouterTestingModule],
      providers: [CartService, {provide: Router, useValue: MOCKROUTER}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    cartService = TestBed.inject(CartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if no item added to cart the page should not display any items', () => {
    cartService.getCartItems();
    expect(component.cartItems).toBeLessThanOrEqual(0);
  });

  it('should display cart items when user added any item to cart', () => {
    cartService.setCartItems(BOOK);
    cartService.getCartItems();
    expect(component.cartItems).toContain(BOOK);
  });

  it('should delete cart items when user click on delete button', () => {
    component.deleteBook(BOOK);
    expect(component.cartItems).toBeLessThanOrEqual(0);
  });

  it('should navigate to billing page when user click on purchase button', () => {
    component.purchaseBook(BOOK);
    expect(MOCKROUTER.navigate).toHaveBeenCalledWith(['/billing-info']);
  });
});
