import { Injectable } from '@angular/core';
import { IBook } from '../_models/book-details';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: IBook[] = [];
  constructor() { }

  deleteBook(item: IBook): IBook[] {
    this.cartItems.splice(
      this.cartItems.findIndex((e) => e.id === item.id),
      1
    );
    return this.cartItems;
  }

  removeCartItems(purchasedBooks: any[]): IBook[] {
    this.cartItems.forEach((item1, index1) => {
      purchasedBooks.forEach((item2) => {
        if (item1.id === item2.bookInfo.id){
          this.cartItems.splice(index1, 1);
        }
      });
    });
    return this.cartItems;
  }
}
