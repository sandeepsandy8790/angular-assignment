import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../shared/books.service';
import { Subscription } from 'rxjs';
import { IBook } from '../../_models/book-details';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  bookData!: IBook;
  displayCard: boolean;
  subscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService
  ) {
    this.displayCard = false;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['', Validators.required],
    });
    this.displayCard = false;
  }
  findBooks(): IBook {
    console.log(this.searchForm.value.searchQuery);
    const Query = this.searchForm.value.searchQuery;
    this.subscription = this.bookService.getBooks(Query).subscribe((result) => {
      console.log(result.items);
      this.bookData = result.items;
    });
    this.displayCard = true;
    return this.bookData;
  }

  viewBookDetails(item: IBook): any {
    console.log(item);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
