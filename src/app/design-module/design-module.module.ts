import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatDialog } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {MatDialogModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],

  exports: [
    ChartsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDividerModule,
    LayoutModule,
    MatTableModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatDialogModule
  ]
  ,
  providers: [MatDialog]
})
export class DesignModuleModule { }
