
import {  Component, OnInit, signal } from '@angular/core';
import { VedioDailogComponent } from '../vedio-dailog/vedio-dailog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent    {


  constructor(private dialog: MatDialog) {}

 openVideoDialog(): void {
  this.dialog.open(VedioDailogComponent, {
    width: '600px',
    height:'400px',
  });
}



}
