import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// Bring in Volunteers
import { VolunteersService } from '../../../services/volunteers.service';
import { Volunteer } from '../../../models/Volunteer';

export class VolunteerTableDataSource extends DataSource<Volunteer> {
  data: Volunteer[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private volunteersService: VolunteersService) {
    super();
    this.volunteersService
      .getVolunteers()
      .subscribe((volunteers) => (this.data = volunteers));
  }

  connect(): Observable<Volunteer[]> {
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

  private getPagedData(data: Volunteer[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Volunteer[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'familyID':
          return compare(a.familyID, b.familyID, isAsc);
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
