import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartModuleRoutingModule } from './cart-module-routing.module';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartModuleRoutingModule
  ]
})
export class CartModuleModule { }
