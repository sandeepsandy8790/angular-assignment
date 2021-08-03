import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IBook } from '../_models/book-details';

@Injectable({
  providedIn: 'root',
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

  private errorHandler(error: HttpErrorResponse): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
