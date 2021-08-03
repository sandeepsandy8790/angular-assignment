import { Component, OnInit } from '@angular/core';
import { BooksBillingService } from '../../shared/books-billing.service';
import { IBook } from '../../_models/book-details';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss'],
})
export class MyCollectionComponent implements OnInit {
  myCollections!: IBook[];
  constructor(private billingService: BooksBillingService) {}

  ngOnInit(): void {
    this.myCollections = this.billingService.purchasedBooks;
  }
}
