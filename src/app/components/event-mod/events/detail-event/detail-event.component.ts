import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Event } from '../../../../models/Event';
import { EventsService } from '../../../../services/events.service';
import { MatDialog } from '@angular/material/dialog';

import { DeleteEventComponent } from '../delete-event/delete-event.component';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
  headerTitle = 'Event Details Page';
  headerColor = 'accent';
  headerIcon = 'event';

  id: string;
  event: Event = {
    date: null,
    type: '',
    isFull: false,
    cantor: '',
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
    other: '',
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
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventsService.getEvent(this.id).subscribe((event) => {
      this.event = event;
    });
  }

  onDeleteClicked() {
    const dialogRef = this.dialog.open(DeleteEventComponent, {
      width: '325px',
      data: { type: this.event.type, date: this.event.date },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        dialogRef.close();
        return;
      } else {
        this.eventsService.deleteEvent(this.event);
      }
      this.router.navigate(['/events']);
    });
  }
}
