import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FamilyIDRoutingModule } from './family-id-routing.module';

import { FamilyIDsComponent } from './family-ids/family-ids.component';
import { AddFamilyIDComponent } from './family-ids/add-family-id/add-family-id.component';
import { EditFamilyIDComponent } from './family-ids/edit-family-id/edit-family-id.component';
import { DetailFamilyIDComponent } from './family-ids/detail-family-id/detail-family-id.component';
import { DeleteFamilyIDComponent } from './family-ids/delete-family-id/delete-family-id.component';

import { TableModule } from '../table-mod/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    FamilyIDsComponent,
    AddFamilyIDComponent,
    EditFamilyIDComponent,
    DetailFamilyIDComponent,
    DeleteFamilyIDComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FamilyIDRoutingModule,
    TableModule,
    FlexLayoutModule,
  ],
})
export class FamilyIDModule {}
