import {SidebarMenuItemComponent} from './sidebar-menu-item/sidebar-menu-item.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

const COMPONENTS = [
  SidebarMenuItemComponent,
  ImageUploaderComponent,
  SpinnerOverlayComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }
