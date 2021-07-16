import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailVolunteerComponent } from '../volunteer-mod/volunteers/detail-volunteer/detail-volunteer.component';
import { DetailEventComponent } from '../event-mod/events/detail-event/detail-event.component';

const routes: Routes = [
  { path: 'volunteer-detail/:id', component: DetailVolunteerComponent },
  { path: 'event-detail/:id', component: DetailEventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
