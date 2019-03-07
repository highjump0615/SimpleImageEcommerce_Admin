import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../components/dialogs/error-dialog/error-dialog.component';
import {ConfirmDialogComponent} from '../components/dialogs/confirm-dialog/confirm-dialog.component';

export class BasePage {

  constructor(
    public dialog?: MatDialog
  ) {
  }

  /**
   * show error alert
   * @param title
   * @param msg
   */
  showErrorDialg(title, msg) {
    this.dialog.open(ErrorDialogComponent, {
      width: '410px',
      data: {
        title: title,
        msg: msg
      }
    });
  }

  showConfirmDialog(title, msg) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: title,
        msg: msg
      }
    });
  }
}
