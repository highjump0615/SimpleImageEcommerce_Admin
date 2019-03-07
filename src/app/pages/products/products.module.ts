import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {ComponentsModule} from '../../components/components.module';
import {FormsModule} from '@angular/forms';
import {SpinnerOverlayComponent} from '../../components/spinner-overlay/spinner-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AngularFontAwesomeModule,
    ComponentsModule,
    FormsModule
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent
  ]
})
export class ProductsModule { }
