import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
  loading: boolean;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }

  loadingOn() {
    this.loading = true;
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loading = false;
    this.loadingSubject.next(false);
  }
}
