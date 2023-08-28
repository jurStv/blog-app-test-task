import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IConfirmDialogData {
  title: string;
  message: string;
  okButtonText?: string;
  cancelButtonText?: string;
}

@Component({
  templateUrl: './confirm-dialog.component.html',
  styles: [`
    [mat-dialog-actions] {
      justify-content: flex-end;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData,
  ) { }

  ngOnInit(): void {}

  close(confirm: boolean) {
    this.dialogRef.close(confirm);
  }
}
