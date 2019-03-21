import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {MatSnackBar} from '@angular/material';
import {Dashboard} from '../../models/dashboard';
import {Setting} from '../../models/setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loading = true;

  setting: any;

  aboutApp = '';

  constructor(
    public api: ApiService,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    //
    // fetch setting
    //
    this.api.fetchSettings()
      .then((s) => {
        this.setting = s;

        // init data
        this.aboutApp = s.about;

        this.loading = false;
      })
      .catch((err) => {
        console.log(err);

        this.loading = false;
      });
  }

  onSubmit() {
    let s = this.setting;
    if (!s) {
      s = new Setting();
    }

    s.about = this.aboutApp;

    this.loading = true;

    s.saveToDatabaseWithoutId()
      .then((data) => {
        // show success notice
        this.snackbar.open(
          'Saved successfully',
          null,
          {
            duration: 2000
          });

        this.loading = false;
      })
      .catch((err) => {
        console.log(err);

        // show err notice
        this.snackbar.open(
          err.message,
          null,
          {
            duration: 2000
          });

        this.loading = false;
      });
  }
}
