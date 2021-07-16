import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  eventCollection: AngularFirestoreCollection<Event>;
  eventDoc: AngularFirestoreDocument<Event>;
  events: Observable<Event[]>;
  event: Observable<Event>;
  eventDateArray: [];

  constructor(private afs: AngularFirestore) {
    this.eventCollection = afs.collection<Event>('mpt_event');
  }

  getEvents() {
    this.events = this.eventCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.events;
  }

  getEvent(id: string): Observable<Event> {
    this.eventDoc = this.afs.doc<Event>(`mpt_event/${id}`);
    this.event = this.eventDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Event;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.event;
  }

  addEvent(event: Event) {
    this.eventCollection.add(event);
  }

  updateEvent(event: Event) {
    this.eventDoc = this.afs.doc(`mpt_event/${event.id}`);
    this.eventDoc.update(event);
  }

  deleteEvent(event: Event) {
    this.eventDoc = this.afs.doc(`mpt_event/${event.id}`);
    this.eventDoc.delete();
  }
}
