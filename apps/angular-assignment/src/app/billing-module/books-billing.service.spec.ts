import { TestBed } from '@angular/core/testing';

import { BooksBillingService } from './books-billing.service';
import { IBook } from '../_models/book-details';

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
describe('BooksBillingService', () => {
  let service: BooksBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the user books which we wants to buy', () => {
    service.setBilledBooks(BOOK);
    expect(service.billedBooks).toEqual(BOOK);
  });

  it('should get the billed books for billing', () => {
    service.setBilledBooks(BOOK);
    service.getBilledBooks();
    expect(service.billedBooks).toEqual(BOOK);
  });

  it('should get purchased books', () => {
    service.purchasedBooks.push(BOOK);
    service.getPurchasedBooks();
    expect(service.purchasedBooks.length).toEqual(1);
  });
});
