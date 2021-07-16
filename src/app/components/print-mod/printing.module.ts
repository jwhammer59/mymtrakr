import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { PrintingRoutingModule } from './printing-routing.module';

import { ScheduleComponent } from './print-schedule/schedule.component';
import { PrintFamilyIdComponent } from './print-family-id/print-family-id.component';

import { TableModule } from '../table-mod/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ScheduleComponent, PrintFamilyIdComponent],
  imports: [
    CommonModule,
    PrintingRoutingModule,
    SharedModule,
    TableModule,
    FlexLayoutModule,
  ],
})
export class PrintingModule {}
