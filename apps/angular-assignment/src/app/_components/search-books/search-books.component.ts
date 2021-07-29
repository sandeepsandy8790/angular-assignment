import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../shared/books.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent implements OnInit {
  searchForm: FormGroup;
  bookData: any;
  displayCard: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['', Validators.required],
    });
    this.displayCard = false;
  }
  findBooks(): any {
    console.log(this.searchForm.value.searchQuery);
    const Query = this.searchForm.value.searchQuery;
    this.bookService.getBooks(Query).subscribe((result) => {
      console.log(result.items);
      this.bookData = result.items;
    });
    this.displayCard = true;
  }

  viewBookDetails(item): any{
    console.log(item);
  }
}
