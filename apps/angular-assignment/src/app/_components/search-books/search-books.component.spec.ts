import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBooksComponent } from './search-books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BooksService } from '../books.service';
import { of } from 'rxjs';
import { IBook } from '../../_models/book-details';
import { Router } from '@angular/router';

const BOOK: IBook = {
  id: '111',
  volumeInfo: {
    title: 'Angular',
    subtitle: 'Typescript Framework',
    authors: 'XYZ',
    publishedDate: '02-05-2001',
    description: 'testing',
    imageLinks: 'hbdhbfh',
  },
  saleInfo: {
    country: 'India',
    listPrice: '12$',
  },
};

describe('SearchBooksComponent', () => {
  let component: SearchBooksComponent;
  let fixture: ComponentFixture<SearchBooksComponent>;
  let bookService: BooksService;
  const MOCKROUTER = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBooksComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [BooksService, { provide: Router, useValue: MOCKROUTER }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBooksComponent);
    bookService = TestBed.inject(BooksService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form is invalid when no data entered', () => {
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('form is valid when user enters data', () => {
    component.searchForm.setValue({ searchQuery: 'Angular' });
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('find books based on user searchQuery', () => {
    expect(component.searchForm.valid).toBeFalsy();
    component.searchForm.setValue({ searchQuery: 'Angular' });
    expect(component.searchForm.valid).toBeTruthy();
    spyOn(bookService, 'getBooks').and.returnValue(of(BOOK));
    component.findBooks();
  });

  it('display only search field till we get results from api', () => {
    expect(component.searchForm.valid).toBeFalsy();
    expect(component.displayCard).toBeFalse();
  });

  it('display books in ui once we get results', () => {
    component.findBooks();
    expect(component.displayCard).toBeTrue();
  });

  it('store the user clicked book information and navigate to book-details', () => {
    component.viewBookDetails(BOOK);
    expect(MOCKROUTER.navigate).toHaveBeenCalledWith(['/book-details']);
  });
});
