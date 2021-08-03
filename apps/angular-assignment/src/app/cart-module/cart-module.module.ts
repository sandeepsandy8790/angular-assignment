import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../material-module';
import { CartModuleRoutingModule } from './cart-module-routing.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, AngularMaterialModule, CartModuleRoutingModule],
})
export class CartModuleModule {}
