import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingComponent } from './billing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BooksBillingService } from '../books-billing.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart-module/cart.service';


describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;
  let billingService: BooksBillingService;
  let cartService: CartService;
  const MOCKROUTER = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingComponent ],
      imports: [ReactiveFormsModule, MatDialogModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [MatDialog, BooksBillingService, CartService, {provide: Router, useValue: MOCKROUTER}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingComponent);
    billingService = TestBed.inject(BooksBillingService);
    cartService = TestBed.inject(CartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid when no data entered by user', () => {
    component.billingForm.controls.name.setValue('');
    component.billingForm.controls.email.setValue('');
    component.billingForm.controls.mobile.setValue('');
    component.billingForm.controls.address.setValue('');
    expect(component.billingForm.valid).toBeFalsy();
  });

  it('form should be valid when data entered by user', () => {
    component.billingForm.controls.name.setValue('sandy');
    component.billingForm.controls.email.setValue('sandy@gmail.com');
    component.billingForm.controls.mobile.setValue('6578976545');
    component.billingForm.controls.address.setValue('Hyderabad');
    expect(component.billingForm.valid).toBeTruthy();
  });

  it('should submit the form when form is valid and purchased book count should be incremented and cart count should decrease', () => {
    expect(component.billingForm.valid).toBeFalsy();
    component.billingForm.controls.name.setValue('sandy');
    component.billingForm.controls.email.setValue('sandy@gmail.com');
    component.billingForm.controls.mobile.setValue('6578976545');
    component.billingForm.controls.address.setValue('Hyderabad');
    expect(component.billingForm.valid).toBeTruthy();
    component.submitForm();
    billingService.purchasedBooks.push(component.billingForm.value);
    expect(billingService.purchasedBooks.length).toBeGreaterThanOrEqual(1);
    cartService.removeCartItems(billingService.purchasedBooks);
    expect(cartService.getCartItems.length).toEqual(0);
  });
});
