import {AfterViewInit, Component, OnInit} from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import {Product} from '../../models/product';
import {BaseModel} from '../../models/base-model';
import {BasePage} from '../base.page';
import {MatDialog} from '@angular/material';
import {ApiService} from '../../services/api/api.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BasePage implements OnInit, AfterViewInit {

  loading = true;

  products: Array<Product> = [];
  dataTable: any;

  constructor(
    public dialog: MatDialog,
    public api: ApiService
  ) {
    super(dialog);
  }

  ngOnInit() {
    //
    // fetch recipes
    //
    this.api.fetchAllProducts()
      .then((prods) => {
        this.products = prods;

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
      this.dataTable = table.DataTable({
        'columns': [
          null,
          null,
          null,
          {
            orderable: false
          }
        ]
      });
    }, 0);
  }

  onDetail(index) {
    console.log(index);
  }

  onRemove(event, index) {
    // show confirm dialog
    const ref = this.showConfirmDialog(
      'Are you sure to delete this product?',
      'Product data cannot be restored once deleted'
    );

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.doRemoveItem(index);
      }
    });

    event.stopPropagation();
  }

  doRemoveItem(index) {
    // delete from db
    this.api.deleteFromDb(this.products[index]);

    // remove from list
    this.products.splice(index, 1);

    // reinit table
    this.initDatatable();
  }
}
