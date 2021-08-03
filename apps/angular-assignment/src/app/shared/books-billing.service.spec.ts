import { TestBed } from '@angular/core/testing';

import { BooksBillingService } from './books-billing.service';

describe('BooksBillingService', () => {
  let service: BooksBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
