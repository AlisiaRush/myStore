import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private pageSizeSubject = new BehaviorSubject<number>(10);
  pageSize$ = this.pageSizeSubject.asObservable();

  setPageSize(pageSize: number) {
    this.pageSizeSubject.next(pageSize);
  }
}
