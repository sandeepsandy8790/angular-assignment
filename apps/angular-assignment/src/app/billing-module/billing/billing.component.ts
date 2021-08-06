import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksBillingService } from '../books-billing.service';
import { IBook } from '../../_models/book-details';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { CartService } from '../../cart-module/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit, OnDestroy {
  billedBooks!: IBook;
  billingForm!: FormGroup;
  subscription!: Subscription;
  constructor(
    private billingService: BooksBillingService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.billedBooks = this.billingService.getBilledBooks();
    this.setBillingForm();
  }

  setBillingForm(): void {
    this.billingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.billingForm.controls[controlName].hasError(errorName);
  }

  submitForm(): void {
    if (this.billingForm.valid) {
      this.billingService.purchasedBooks.push({
        billingInfo: this.billingForm.value,
        bookInfo: this.billedBooks,
      });
      this.cartService.removeCartItems(this.billingService.purchasedBooks);
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
      });
      this.subscription = dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        this.router.navigate(['/search-book']);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
