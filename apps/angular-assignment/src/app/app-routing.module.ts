import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBooksComponent } from './_components/search-books/search-books.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search-book' },
  { path: 'search-book', component: SearchBooksComponent },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart-module/cart-module.module').then(
        (m) => m.CartModuleModule
      ),
  },
  {
    path: 'book-details',
    loadChildren: () =>
      import('./book-details-module/book-details-module.module').then(
        (m) => m.BookDetailsModuleModule
      ),
  },
  {
    path: 'my-collections',
    loadChildren: () =>
      import('./my-collections-module/my-collections-module.module').then(
        (m) => m.MyCollectionsModuleModule
      ),
  },
  {
    path: 'billing-info',
    loadChildren: () =>
      import('./billing-module/billing-module.module').then(
        (m) => m.BillingModuleModule
      ),
  },
  {
    path: 'cart-items',
    loadChildren: () =>
      import('./cart-module/cart-module.module').then(
        (m) => m.CartModuleModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
