import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Subscription } from 'rxjs';
import { IBook } from '../../_models/book-details';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  bookData!: IBook[];
  displayCard: boolean;
  subscription!: Subscription;
  errorMsg!: any;
  errorText = 'No Books Found with Search Query Try with new keyword';
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router
  ) {
    this.displayCard = false;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['', Validators.required],
    });
    this.displayCard = false;
  }
  findBooks(): IBook[] {
    const Query = this.searchForm.value.searchQuery;
    this.subscription = this.bookService.getBooks(Query).subscribe(
      (result) => {
        this.bookData = result.items;
        if (result.items === undefined) {
          this.errorMsg = this.errorText ;
        }
      },
      (error) => {
        this.errorMsg = error;
        console.log(error);
      }
    );
    this.displayCard = true;
    return this.bookData;
  }

  viewBookDetails(item: IBook): any {
    this.bookService.setBookDetails(item);
    this.router.navigate(['/book-details']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
