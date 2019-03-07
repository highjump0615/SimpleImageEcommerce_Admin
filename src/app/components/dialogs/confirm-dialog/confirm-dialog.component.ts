import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from '../base-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['../dialog.scss']
})
export class ConfirmDialogComponent extends BaseDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(data);
  }

  ngOnInit() {
  }

  onOK() {
    this.dialogRef.close(true);
  }
}
