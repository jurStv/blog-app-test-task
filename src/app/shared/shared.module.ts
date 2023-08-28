import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PipesModule } from './pipes';
import { LetDirective, StopPropagationDirective, GoBackDirective } from './directives';
import { ConfirmDialogComponent } from './components';
import { ProgressModule } from './progress';
import { SharedDialogService } from './services';

const COMPONENTS = [ConfirmDialogComponent];
const DIRECTIVES = [LetDirective, StopPropagationDirective, GoBackDirective];

const NG_MODULES = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
];

const MATERIAL_MODULES = [
  MatPaginatorModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatCardModule,
  MatDialogModule,
  MatSidenavModule
];

@NgModule({
  declarations: [ ...COMPONENTS, ...DIRECTIVES ],
  imports: [
    ...NG_MODULES,
    ...MATERIAL_MODULES,
    PipesModule,
    ProgressModule
  ],
  exports: [
    ...NG_MODULES,
    ...MATERIAL_MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    PipesModule,
    ProgressModule
  ],
  providers: [SharedDialogService]
})
export class SharedModule { }
