import {AfterViewInit, Component, OnInit} from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import {Dashboard} from '../../models/dashboard';
import {ApiService} from '../../services/api/api.service';
import {Order} from '../../models/order';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  loading = true;

  orders: Array<Order> = [];
  dashboard: Dashboard;
  dataTable: any;

  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    //
    // fetch dashboard
    //
    this.api.fetchDashboard()
      .then((d) => {
        this.dashboard = d;
      })
      .catch((err) => {
        console.log(err);
      });

    //
    // fetch orders of recent 7 days
    //
    const time = moment().subtract(7, 'days');
    this.api.fetchOrders(time.valueOf())
      .then((ords) => {
        this.orders = ords;

        // reinit table
        this.initDatatable();

        this.loading = false;
      })
      .catch((err) => {
        console.log(err);

        this.loading = false;
      });
  }

  ngAfterViewInit() {
    this.initDatatable();
  }

  private initDatatable(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
      this.dataTable = null;
    }

    setTimeout(() => {
      const table: any = $('table');
      this.dataTable = table.DataTable();
    }, 0);
  }
}
