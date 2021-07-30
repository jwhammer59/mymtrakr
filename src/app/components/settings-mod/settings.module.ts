import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { TableModule } from '../table-mod/table.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { AddSettingComponent } from './settings/add-setting/add-setting.component';
import { EditSettingComponent } from './settings/edit-setting/edit-setting.component';

@NgModule({
  declarations: [SettingsComponent, AddSettingComponent, EditSettingComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, TableModule],
})
export class SettingsModule {}
