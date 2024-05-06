import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  loggedIn: number;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.loggedIn = data.loggedIn;
  }
  snackBarRef = inject(MatSnackBarRef);
}
