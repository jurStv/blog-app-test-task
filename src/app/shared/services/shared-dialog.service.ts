import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent, IConfirmDialogData } from '../components';

@Injectable({ providedIn: 'root' })
export class SharedDialogService {
  constructor(
    private dialog: MatDialog,
  ) {}

  openConfirmDialog(data: IConfirmDialogData): MatDialogRef<ConfirmDialogComponent, boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data,
    });
  }
}
