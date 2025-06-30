import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})
export class SuccessDialogComponent {

  readonly dialog = inject(MatDialogRef<SuccessDialogComponent>);

  CloseDialog(): void {
    this.dialog.close();
  }
}
