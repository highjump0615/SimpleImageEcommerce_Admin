import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './pages/main/main.component';
import {ComponentsModule} from './components/components.module';
import {OverlayModule} from '@angular/cdk/overlay';
import {SpinnerOverlayComponent} from './components/spinner-overlay/spinner-overlay.component';
import {MatDialogModule, MatProgressSpinnerModule} from '@angular/material';
import {SpinnerOverlayService} from 'app/services/spinner-overlay.service';
import {AuthService} from './services/auth.service';
import {ErrorDialogComponent} from './components/dialogs/error-dialog/error-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './guards/auth.guard';
import {StorageServiceModule} from 'ngx-webstorage-service';


const COMPONENTS = [
  SpinnerOverlayComponent,
  ErrorDialogComponent
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    OverlayModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    StorageServiceModule
  ],
  providers: [
    SpinnerOverlayService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ...COMPONENTS
  ]
})
export class AppModule { }
