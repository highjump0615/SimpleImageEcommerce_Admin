import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/signin/signin.module#SigninModule'
  },
  {
    path: 'home',
    component: MainComponent,
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'orders',
    component: MainComponent,
    loadChildren: './pages/orders/orders.module#OrdersModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
