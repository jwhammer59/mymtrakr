import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { VolunteerRoutingModule } from './volunteer-routing.module';

import { VolunteersComponent } from './volunteers/volunteers.component';
import { AddVolunteerComponent } from './volunteers/add-volunteer/add-volunteer.component';
import { EditVolunteerComponent } from './volunteers/edit-volunteer/edit-volunteer.component';
import { DetailVolunteerComponent } from './volunteers/detail-volunteer/detail-volunteer.component';
import { DeleteVolunteerComponent } from './volunteers/delete-volunteer/delete-volunteer.component';

import { TableModule } from '../table-mod/table.module';
import { AddUnDateComponent } from './volunteers/add-undate/add-undate.component';

@NgModule({
  declarations: [
    VolunteersComponent,
    AddVolunteerComponent,
    EditVolunteerComponent,
    DetailVolunteerComponent,
    DeleteVolunteerComponent,
    AddUnDateComponent,
  ],
  imports: [CommonModule, VolunteerRoutingModule, SharedModule, TableModule],
})
export class VolunteerModule {}
