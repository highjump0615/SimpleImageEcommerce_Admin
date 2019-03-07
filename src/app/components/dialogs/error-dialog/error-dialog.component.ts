import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {BaseDialog} from '../base-dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent extends BaseDialog implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(data);
  }

  ngOnInit() {
  }

}
