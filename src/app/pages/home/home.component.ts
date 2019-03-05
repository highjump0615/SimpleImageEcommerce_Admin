import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataTable: any;

  constructor() { }

  ngOnInit() {
    const table: any = $('table');
    this.dataTable = table.DataTable();
  }

}
