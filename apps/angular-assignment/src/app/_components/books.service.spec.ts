import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { BooksService } from './books.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IBook } from '../_models/book-details';
import { HttpErrorResponse, HttpHeaders, HttpEventType } from '@angular/common/http';

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
describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error if there is any error from api', () => {
    const error: HttpErrorResponse = {
      name: 'HttpErrorResponse',
      message: 'string',
      error: 'any',
      ok: false,
      status: 1,
      statusText: 'some error',
      url: '',
      type: HttpEventType.Response,
      headers: new HttpHeaders()
    };
    service.errorHandler(error);
    spyOn(service , 'errorHandler');
    expect(service.errorHandler).toHaveBeenCalledTimes(0);

  });
  it('should return books from google api with the user entered keyword', fakeAsync(() => {
    service.getBooks('Angular').subscribe((result) => {
      expect(result).toEqual(BOOK);
    });

    const request = httpMock.expectOne(service.ENDPOINT + 'Angular');
    expect(request.request.method).toEqual('GET');
    request.flush(BOOK);

    tick();

  }));

  it('should set the book details when user clicks on any book card', () => {
    service.setBookDetails(BOOK);
    expect(service.bookDetails).toEqual(BOOK);
  });

  it('should get book details when user navigate to book details page', () => {
    service.setBookDetails(BOOK);
    service.getBookDetails();
    expect(Object.values(service.bookDetails).indexOf('111') > -1).toBeTrue();
  });
});
