import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ImageUploaderComponent} from '../../../components/image-uploader/image-uploader.component';
import {Product} from '../../../models/product';
import {FirebaseManager} from '../../../helpers/firebase-manager';
import {BasePage} from '../../base.page';
import {Router} from '@angular/router';
import {SpinnerOverlayService} from '../../../services/spinner-overlay.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends BasePage implements OnInit {

  title = '';
  price: number;
  description = '';

  @ViewChild('imagePhoto') uploadPhoto: ImageUploaderComponent;

  constructor(
    public router: Router,
    public snackbar: MatSnackBar,
    public dialog: MatDialog,
    private overlay: SpinnerOverlayService
  ) {
    super(dialog);
  }

  ngOnInit() {
  }

  onSubmit() {
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

    this.overlay.show();

    //
    // add new product
    //
    const product = new Product();

    product.title = this.title;
    product.price = this.price;
    product.desc = this.description;

    product.generateNewId();

    //
    // upload image data
    //
    const path = 'products/' + product.id;
    FirebaseManager.getInstance().uploadImageTo(
      path,
      this.uploadPhoto.picture
    ).then((url) => {
      product.imageUrl = url;

      product.saveToDatabase();

      // show success notice
      this.snackbar.open(
        'Product added successfully',
        null,
        {
          duration: 2000
        });

      // go to list page
      this.router.navigate(['products']);

      this.overlay.hide();
    }).catch((err) => {
      // show error alert
      this.showErrorDialg(
        'Failed image upload',
        err.message
      );

      this.overlay.hide();
    });
  }
}
