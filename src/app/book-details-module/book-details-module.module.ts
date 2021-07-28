import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDetailsModuleRoutingModule } from './book-details-module-routing.module';
import { BookDetailsComponent } from './book-details/book-details.component';


@NgModule({
  declarations: [BookDetailsComponent],
  imports: [
    CommonModule,
    BookDetailsModuleRoutingModule
  ]
})
export class BookDetailsModuleModule { }
