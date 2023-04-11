import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackMessage$ = new Subject<any>();
  newSnackMessage$ = this.snackMessage$.asObservable();

  constructor(private router: Router) {}

  openSnack(message: any) {
    this.snackMessage$.next(message);
  }

  openNoResponseSnack() {
    this.openSnack({
      value: "Haven't got data back!",
      color: "back-blue"}
      );
  }

  openInvalidInputSnack(){
    this.openSnack({
      value: "Check inputs again!",
      color: "back-red-orange"}
      );
  }
}