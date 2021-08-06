import { Injectable } from '@angular/core';
import { IBook } from '../_models/book-details';

@Injectable({
  providedIn: 'root'
})
export class BooksBillingService {
  billedBooks!: IBook;
  purchasedBooks: any[] = [];
  constructor() { }

   setBilledBooks(item: IBook): void{
    this.billedBooks = item;
  }

  getBilledBooks(): IBook {
    return this.billedBooks;
  }

  getPurchasedBooks(): IBook[] {
    return this.purchasedBooks;
  }
}
