import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../material-module';
import { MyCollectionsModuleRoutingModule } from './my-collections-module-routing.module';
import { MyCollectionComponent } from './my-collection/my-collection.component';

@NgModule({
  declarations: [MyCollectionComponent],
  imports: [
    CommonModule,
    MyCollectionsModuleRoutingModule,
    AngularMaterialModule,
  ],
})
export class MyCollectionsModuleModule {}
