import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  findBooks(): IBook {
    const Query = this.searchForm.value.searchQuery;
    this.subscription = this.bookService.getBooks(Query).subscribe((result) => {
      this.bookData = result.items;
    });
    this.displayCard = true;
    return this.bookData;
  }

  viewBookDetails(item: IBook): any {
    this.bookService.bookDetails = item;
    this.router.navigate(['/book-details']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
