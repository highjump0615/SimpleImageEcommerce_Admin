Simple Image Ecommerce Admin Panel
======

> Angular web; Admin panel of Simple Image Ecommerce mobile app

## Overview
Working with [Admin panel](https://github.com/highjump0615/SimpleImageEcommerce_Admin) and [Firebase cloud functions](https://github.com/highjump0615/SimpleImageEcommerce_Cloud)

### 1. Main Features
- Product management  
Add, Remove, Update of product images  
- Order list  
- Settings  
App settings such as description of About the App  
 
### 2. Techniques   
AngularJS v5.2.0  
#### 2.1 UI Implementation  
Used [Bootstrap](https://getbootstrap.com) v4.1.3 as the overall style
##### 2.1.1 Implement UI pages based on Flexbox layout
##### 2.1.2 Custom components  
- Dialogs  
  - Confirm Dialog ``<app-confirm-dialog>``  
  Confirmation dialog with Ok & Cancel
  - Simple Dialog ``<app-error-dialog>``  
  Simple alert dialog for error notice  
- Image Uploader ``<app-image-uploader>``  
Integrated ``<input type="file">`` for selecting images  
  - Can set any default content when no image selected  
- Sidebar menu item ``<app-sidebar-menu-item>``  
Menu items of sidebar of main page  
- Spinner overlay ``<app-spinner-overlay>``  
Loading overlay mask to show progress  
  
#### 2.2 Function Implementation
##### 2.2.1 Auth module
``AuthService`` in *app/services/auth.service.ts*  
User signup, login, signout, ...  

##### 2.2.2 Api module
``ApiService`` in *app/services/api/api.service.ts*  
Main interfaces for fetching and writing data to database  

- Google Firebase for backend  

##### 2.2.3 Auth guard
``AuthGuard`` in *app/guards/auth.guard.ts*  
- Redirect to log in page when not authenticated  
- Redirect to home page when visits log in page with authenticated  

##### 2.2.4 Db structure
```
|
+- carts
| |
| +- {userId}
|   |
|   +- {productId}: true
|   +- ...
|    
+- dashboard
| |
| +- order_amount
| +- order_count
|
+- orders
| |
| +- ...
|
+- products
| |
| +- ...
|
+- purchased
| |
| +- {userId}
|   |
|   +- {productId}: {orderId}
|   +- ...
|
+- settings
|
+- users
  |
  +- ...
```

#### 2.3 Code tricks  
- Using Angular Material [Overlay](https://v5.material.angular.io/cdk/overlay/overview) and [Portal](https://v5.material.angular.io/cdk/portal/overview) to implement full screen loading mask  
```typescript  
@Injectable()
export class SpinnerOverlayService {

  private overlayRef: OverlayRef = null;

  constructor(private overlay: Overlay) { }

  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();

      // Create ComponentPortal that can be attached to a PortalHost
      const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
      this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    }
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
}
```  

#### 2.4 Third-Party Libraries
##### 2.4.1 [Firebase JS SDK](https://github.com/firebase/firebase-js-sdk) v5.8.5  
Main backend & database for the web app

##### 2.4.2 [Webstorage services for Angular](https://github.com/dscheerens/ngx-webstorage-service) v3.1.3
Save logged in user information  

##### 2.4.3 [Angular Material](https://github.com/angular/material2) v5.2.5  
Overlay, Portal  

##### 2.4.4 [Moment.js](https://github.com/moment/moment/) v2.24.0  
- Showing data in order list pages  
- Date operation in dashboard page


## Need to Improve
Polish and improve features
