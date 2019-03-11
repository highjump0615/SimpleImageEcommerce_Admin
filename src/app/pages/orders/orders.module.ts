import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ComponentsModule
  ],
  declarations: [
    OrdersComponent
  ]
})
export class OrdersModule { }
