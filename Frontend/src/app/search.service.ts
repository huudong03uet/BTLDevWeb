import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public search$ = this.searchSubject.asObservable();

  setSearch(search: string): void {
    this.searchSubject.next(search);
  }

  getSearch(): any {
    return this.searchSubject.value;
  }
}
