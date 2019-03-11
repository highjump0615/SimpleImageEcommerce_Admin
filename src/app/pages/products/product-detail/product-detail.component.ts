import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ImageUploaderComponent} from '../../../components/image-uploader/image-uploader.component';
import {Product} from '../../../models/product';
import {FirebaseManager} from '../../../helpers/firebase-manager';
import {BasePage} from '../../base.page';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerOverlayService} from '../../../services/spinner-overlay.service';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends BasePage implements OnInit, AfterViewInit {

  title = '';
  price: number;
  description = '';

  // empty means add new, else means update
  productId = '';
  product: any;

  @ViewChild('imagePhoto') uploadPhoto: ImageUploaderComponent;

  constructor(
    public router: Router,
    public snackbar: MatSnackBar,
    public dialog: MatDialog,
    private overlay: SpinnerOverlayService,
    private route: ActivatedRoute,
    public api: ApiService
  ) {
    super(dialog);

    // get product id
    this.productId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.productId) {
      this.overlay.show();

      // fetch product data
      this.api.getProductWithId(this.productId)
        .then((data) => {
          this.product = data;

          // init data
          this.title = data.title;
          this.price = data.price;
          this.description = data.desc;

          this.overlay.hide();
        })
        .catch((err) => {
          this.snackbar.open(
            err.message,
            null,
            {
              duration: 2000
            });

          this.overlay.hide();
        });
    }
  }

  onSubmit() {

    //
    // add new product
    //
    let p = this.product;
    if (!p) {
      // image not selected
      if (!this.uploadPhoto.picture) {
        this.snackbar.open(
          'Image is not selected',
          null,
          {
            duration: 2000
          });

        return;
      }

      p = new Product();
      p.generateNewId();
    }

    //
    // upload image data
    //
    if (this.uploadPhoto.picture) {
      this.overlay.show();

      const path = 'products/' + p.id;
      FirebaseManager.getInstance().uploadImageTo(
        path,
        this.uploadPhoto.picture
      ).then((url) => {
        p.imageUrl = url;
        this.doSaveProduct(p);

        this.overlay.hide();
      }).catch((err) => {
        // show error alert
        this.showErrorDialg(
          'Failed image upload',
          err.message
        );

        this.overlay.hide();
      });
    } else {
      // image not changed
      this.doSaveProduct(p);
    }
  }

  doSaveProduct(p) {
    p.title = this.title;
    p.price = this.price;
    p.desc = this.description;

    p.saveToDatabase();

    // show success notice
    this.snackbar.open(
      this.productId ? 'Product updated successfully' : 'Product added successfully',
      null,
      {
        duration: 2000
      });

    // go to list page
    this.router.navigate(['products']);
  }
}
