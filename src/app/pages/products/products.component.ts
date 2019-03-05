import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  dataTable: any;

  constructor() { }

  ngOnInit() {
    const table: any = $('table');
    this.dataTable = table.DataTable();
  }

}
