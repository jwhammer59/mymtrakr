import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSettingComponent } from './settings/add-setting/add-setting.component';
import { EditSettingComponent } from './settings/edit-setting/edit-setting.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'add-setting', component: AddSettingComponent },
  { path: 'edit-setting', component: EditSettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
