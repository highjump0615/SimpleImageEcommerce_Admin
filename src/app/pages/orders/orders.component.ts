import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import {Order} from '../../models/order';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  loading = true;

  orders: Array<Order> = [];
  dataTable: any;

  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    //
    // fetch recipes
    //
    this.api.fetchOrders()
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
