import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/signin/signin.module#SigninModule',
    canActivate: [AuthGuard],
    data: {path: 'login'}
  },
  {
    path: 'home',
    component: MainComponent,
    loadChildren: './pages/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: MainComponent,
    loadChildren: './pages/orders/orders.module#OrdersModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: MainComponent,
    loadChildren: './pages/products/products.module#ProductsModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: MainComponent,
    loadChildren: './pages/settings/settings.module#SettingsModule',
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
