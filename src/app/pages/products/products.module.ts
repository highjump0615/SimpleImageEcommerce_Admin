import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AngularFontAwesomeModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
