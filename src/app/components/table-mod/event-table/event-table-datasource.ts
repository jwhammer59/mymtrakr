import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// Bring in Items
import { EventsService } from '../../../services/events.service';
import { Event } from '../../../models/Event';

export class EventTableDataSource extends DataSource<Event> {
  data: Event[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private eventsService: EventsService) {
    super();
    this.eventsService.getEvents().subscribe((events) => (this.data = events));
  }

  connect(): Observable<Event[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  disconnect() {}

  private getPagedData(data: Event[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Event[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'type':
          return compare(a.type, b.type, isAsc);
        case 'date':
          return compare(a.date.toString(), b.date.toString(), isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string, b: string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
