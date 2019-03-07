import {Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export class BaseDialog {

  title = '';
  msg = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.msg = data.msg;
  }
}
