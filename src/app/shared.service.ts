import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private myRoomsSource = new BehaviorSubject<boolean>(false);
  myRooms$ = this.myRoomsSource.asObservable();

  setMyRoomsView(status: boolean) {
    this.myRoomsSource.next(status);
  }
}
