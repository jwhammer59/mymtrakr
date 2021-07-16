import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './print-schedule/schedule.component';
import { PrintFamilyIdComponent } from './print-family-id/print-family-id.component';

const routes: Routes = [
  { path: 'schedule/:id', component: ScheduleComponent },
  { path: 'family-id', component: PrintFamilyIdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintingRoutingModule {}
