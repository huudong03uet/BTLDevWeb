import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullOptionControlItemService {



  constructor() { }


  
  private messageSourceSearchFor = new BehaviorSubject<any>(null);
  currentMessageSearchFor = this.messageSourceSearchFor.asObservable();
  changeMessageSearchFor(message: any) {
    console.log("changeMessageSearchFor" + typeof message)
    if (message === "") {
      message = "qwertyuiop"
    }
    this.messageSourceSearchFor.next(message)
  }



  private messageSourceSortBy = new BehaviorSubject<any>(null);
  currentMessageSortBy = this.messageSourceSortBy.asObservable();
  changeMessageSortBy(message: any) {
    
    this.messageSourceSortBy.next(message)
  }

  private messageSourceSortDirection = new BehaviorSubject<any>(null);
  currentMessageSortDirection = this.messageSourceSortDirection.asObservable();

  changeMessageSortDirection(message: any) {
    console.log("changeMessageSortDirection" + message)
    this.messageSourceSortDirection.next(message)
  }

  private messageSourceSelectPublicPrivate = new BehaviorSubject<any>(null);
  currentMessageSelectPublicPrivate = this.messageSourceSelectPublicPrivate.asObservable();
  changeMessageSelectPublicPrivate(message: any) {
    console.log("changeMessageSelectPublicPrivate" + message)
    this.messageSourceSelectPublicPrivate.next(message)
  }



}
