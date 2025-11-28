import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private accessDeniedSubject = new BehaviorSubject<boolean>(false);
  accessDenied$ = this.accessDeniedSubject.asObservable();

  showAccessDenied() {
    this.accessDeniedSubject.next(true);
  }

  hideAccessDenied() {
    this.accessDeniedSubject.next(false);
  }
}
