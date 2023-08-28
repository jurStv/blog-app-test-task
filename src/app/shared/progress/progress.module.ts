import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TopProgressBarContainerComponent } from './top-progress-bar-container.component';

@NgModule({
  declarations: [TopProgressBarContainerComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ]
})
export class ProgressModule { }
