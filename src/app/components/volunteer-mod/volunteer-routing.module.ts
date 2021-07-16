import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteersComponent } from './volunteers/volunteers.component';
import { AddVolunteerComponent } from './volunteers/add-volunteer/add-volunteer.component';
import { EditVolunteerComponent } from './volunteers/edit-volunteer/edit-volunteer.component';
import { DetailVolunteerComponent } from './volunteers/detail-volunteer/detail-volunteer.component';

const routes: Routes = [
  { path: '', component: VolunteersComponent },
  { path: 'add-volunteer', component: AddVolunteerComponent },
  { path: 'edit-volunteer/:id', component: EditVolunteerComponent },
  { path: 'volunteer-detail/:id', component: DetailVolunteerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerRoutingModule {}
