import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingModuleRoutingModule } from './billing-module-routing.module';
import { BillingComponent } from './billing/billing.component';


@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    BillingModuleRoutingModule
  ]
})
export class BillingModuleModule { }
