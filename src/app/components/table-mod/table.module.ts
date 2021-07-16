import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { EventTableComponent } from './event-table/event-table.component';
import { VolunteerTableComponent } from './volunteer-table/volunteer-table.component';
import { FamilyIdTableComponent } from './familyID-table/familyID-table.component';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    EventTableComponent,
    VolunteerTableComponent,
    FamilyIdTableComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    EventTableComponent,
    VolunteerTableComponent,
    FamilyIdTableComponent,
  ],
})
export class TableModule {}
