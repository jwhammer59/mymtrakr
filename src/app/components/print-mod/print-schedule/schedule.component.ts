import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Event } from '../../../models/Event';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  headerTitle = 'Print Schedule';
  headerColor = 'accent';
  headerIcon = 'print';

  id: string;
  event: Event = {
    date: null,
    type: '',
    isFull: false,
    cantor: 'N/A',
    lector1: '',
    lector2: '',
    eMoHC1: '',
    eMoHC2: '',
    eMoHC3: '',
    eMoHC4: '',
    eMoHC5: '',
    eMoHC6: '',
    eMoHC7: '',
    gifts: '',
    giftsChild: '',
    rosary1: '',
    rosary2: '',
    usher1: '',
    usher2: '',
    usher3: '',
    usher4: '',
    usher5: '',
    massCord: '',
    server1: '',
    server2: '',
    server3: '',
    tech1: '',
    tech2: '',
  };

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventsService.getEvent(this.id).subscribe((event) => {
      this.event = event;
    });
  }
}
