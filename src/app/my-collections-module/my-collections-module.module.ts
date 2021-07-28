import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCollectionsModuleRoutingModule } from './my-collections-module-routing.module';
import { MyCollectionComponent } from './my-collection/my-collection.component';


@NgModule({
  declarations: [MyCollectionComponent],
  imports: [
    CommonModule,
    MyCollectionsModuleRoutingModule
  ]
})
export class MyCollectionsModuleModule { }
