import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  endPoint = 'https://www.googleapis.com/books/v1/volumes?q=';
  constructor(private http: HttpClient) {}

  getBooks(queryParam: string): Observable<any> {
    const API_URL = `${this.endPoint}${queryParam}`;
    return this.http.get(API_URL).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
