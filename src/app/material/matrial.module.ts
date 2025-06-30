import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
const MatrialCommon = [
  MatPaginatorModule,
  MatCardModule,
  MatSnackBarModule,
  MatTabsModule,
  MatCheckboxModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatRadioModule,
  MatDialogModule,
  MatSidenavModule,
  MatStepperModule,
  MatTableModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatBadgeModule

]
@NgModule({
  imports: [MatrialCommon],
  exports:[MatrialCommon]
})
export class MatrialModule { }
