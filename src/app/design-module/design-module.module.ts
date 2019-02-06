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
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],

  exports: [
    MatProgressBarModule,
    LayoutModule,
    MatIconModule,
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
