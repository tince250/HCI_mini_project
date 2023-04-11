import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
})
export class SnackBarComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.snackBarService.newSnackMessage$.subscribe((message) => {
      if (typeof message.value == 'string') {
        this.openSnackBar(message.value, 'OK',  message.color);
      }
    });
  }

  openSnackBar(message: string, action: string, color: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: [color]
    });
}}