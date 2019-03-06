import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './pages/main/main.component';
import {ComponentsModule} from './components/components.module';
import {OverlayModule} from '@angular/cdk/overlay';
import {SpinnerOverlayComponent} from './components/spinner-overlay/spinner-overlay.component';
import {MatProgressSpinnerModule} from '@angular/material';
import {SpinnerOverlayService} from 'app/services/spinner-overlay.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SpinnerOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    OverlayModule,
    MatProgressSpinnerModule
  ],
  providers: [
    SpinnerOverlayService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SpinnerOverlayComponent
  ]
})
export class AppModule { }
