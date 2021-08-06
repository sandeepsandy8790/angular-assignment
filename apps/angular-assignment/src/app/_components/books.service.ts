import { Injectable } from '@angular/core';
import { IBook } from '../_models/book-details';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  ENDPOINT = 'https://www.googleapis.com/books/v1/volumes?q=';
  bookDetails!: IBook;
  constructor(private http: HttpClient) {}

  public getBooks(queryParam: string): Observable<any> {
    const API_URL = `${this.ENDPOINT}${queryParam}`;
    return this.http.get(API_URL).pipe(
      map((res: IBook) => {
        return res || {};
      }),
      catchError(this.errorHandler)
    );
  }

  public errorHandler(error: HttpErrorResponse): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getBookDetails(): IBook{
    return this.bookDetails;
  }

  setBookDetails(item: IBook): void{
    this.bookDetails = item;
  }
}
