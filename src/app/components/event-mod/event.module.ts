import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { EventRoutingModule } from './event-routing.module';

import { EventsComponent } from './events/events.component';
import { DeleteEventComponent } from './events/delete-event/delete-event.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { DetailEventComponent } from './events/detail-event/detail-event.component';

import { TableModule } from '../table-mod/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoundNumberPipe } from '../../pipes/round-number-pipe';

@NgModule({
  declarations: [
    EventsComponent,
    DeleteEventComponent,
    AddEventComponent,
    EditEventComponent,
    DetailEventComponent,
    RoundNumberPipe,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    TableModule,
    FlexLayoutModule,
  ],
})
export class EventModule {}
