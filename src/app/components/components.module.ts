import {SidebarMenuItemComponent} from './sidebar-menu-item/sidebar-menu-item.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

const COMPONENTS = [
  SidebarMenuItemComponent,
  ImageUploaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }
