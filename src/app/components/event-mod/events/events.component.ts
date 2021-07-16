import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  headerTitle = 'Events';
  headerColor = 'accent';
  headerIcon = 'event';

  constructor() {}

  ngOnInit(): void {}
}
