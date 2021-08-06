import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionComponent } from './my-collection.component';
import { BooksBillingService } from '../../billing-module/books-billing.service';
import { IBook } from '../../_models/book-details';

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
describe('MyCollectionComponent', () => {
  let component: MyCollectionComponent;
  let fixture: ComponentFixture<MyCollectionComponent>;
  let billingService: BooksBillingService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCollectionComponent ],
      providers: [BooksBillingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionComponent);
    billingService = TestBed.inject(BooksBillingService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the user purchased books', () => {
    billingService.purchasedBooks.push(BOOK);
    billingService.getPurchasedBooks();
    expect(component.myCollections.length).toEqual(1);
  });

  it('should show a message when user opened his collections without purchasing any item', () => {
    billingService.getPurchasedBooks();
    expect(component.myCollections.length).toEqual(0);
  });
});
