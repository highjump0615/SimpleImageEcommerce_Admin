import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
