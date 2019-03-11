import { Injectable } from '@angular/core';
import {FirebaseManager} from '../../helpers/firebase-manager';
import {Product} from '../../models/product';
import {BaseModel} from '../../models/base-model';
import {Order} from '../../models/order';
import {User} from '../../models/user';

@Injectable()
export class ApiService {

  constructor() { }

  /**
   * fetch all products
   */
  fetchAllProducts() {
    const products = [];

    // fetch products
    const dbRef = FirebaseManager.ref();

    const query: any = dbRef.child(Product.TABLE_NAME);
    return query.once('value')
      .then((snapshot) => {
        console.log(snapshot);

        snapshot.forEach(function(child) {
          const p = new Product(child);

          products.push(p);
        });

        return Promise.resolve(products);
      });
  }

  /**
   * remove data from database
   * @param data
   */
  deleteFromDb(data: BaseModel) {
    const db = data.getDatabaseRef();
    db.remove();
  }

  /**
   * fetch product with id
   * @param id
   */
  getProductWithId(id): Promise<Product> {
    const userRef = FirebaseManager.ref()
      .child(Product.TABLE_NAME)
      .child(id);

    return userRef.once('value')
      .then((snapshot) => {
        if (!snapshot.exists()) {
          return Promise.reject(new Error('Product not found'));
        }

        const product = new Product(snapshot);
        return Promise.resolve(product);
      });
  }

  /**
   * fetch user with id
   * @param id
   */
  getUserWithId(id): Promise<User> {
    const userRef = FirebaseManager.ref()
      .child(User.TABLE_NAME)
      .child(id);

    return userRef.once('value')
      .then((snapshot) => {
        if (!snapshot.exists()) {
          const err = new Error('User not found');
          err.name = 'notfound';

          return Promise.reject(err);
        }

        const user = new User(null, snapshot);
        return Promise.resolve(user);
      });
  }


  /**
   * fetch all orders
   */
  fetchOrders() {
    const that = this;

    const orders = [];
    const queriesOrderUser = [];

    // fetch products
    const dbRef = FirebaseManager.ref();

    const query: any = dbRef.child(Order.TABLE_NAME);

    return new Promise<Order[]>((resolve, reject) => {
      query.once('value')
        .then((snapshot) => {
          console.log(snapshot);

          snapshot.forEach(function(child) {
            const o = new Order(child);

            orders.push(o);
            queriesOrderUser.push(that.getUserWithId(o.userId).then((u) => {
              o.user = u;
            }));
          });

          Promise.all(queriesOrderUser)
            .then(() => {
              resolve(orders);
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }
}
