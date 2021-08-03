import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../material-module';
import { BillingModuleRoutingModule } from './billing-module-routing.module';
import { BillingComponent } from './billing/billing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [BillingComponent, DialogComponent],
  imports: [CommonModule, MatDialogModule, AngularMaterialModule, BillingModuleRoutingModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class BillingModuleModule {}
