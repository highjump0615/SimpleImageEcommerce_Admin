import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../components/dialogs/error-dialog/error-dialog.component';

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
      width: '350px',
      data: {
        title: title,
        msg: msg
      }
    });
  }
}
