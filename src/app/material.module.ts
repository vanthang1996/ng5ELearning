import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
// import {MatButtonModule} from '@angular/material/MatButtonModule';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatStepperModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatStepperModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule
  ],
})
export class MaterialModule { }
