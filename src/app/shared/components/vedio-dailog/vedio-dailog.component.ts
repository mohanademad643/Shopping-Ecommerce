import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vedio-dailog',
  templateUrl: './vedio-dailog.component.html',
  styleUrl: './vedio-dailog.component.scss'
})
export class VedioDailogComponent {
  constructor(private dialogRef: MatDialogRef<VedioDailogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
