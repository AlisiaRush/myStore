import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Get search value from user input and share with search results page
  private searchValueSubject = new BehaviorSubject<string>('');
  searchValue$: Observable<string> = this.searchValueSubject.asObservable();

  setSearchValue(value: string) {
    this.searchValueSubject.next(value);
  }
}
