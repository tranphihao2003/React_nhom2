var db = require("./db");
class order_details {
  constructor() {
    this.order_details = [];
  }
  static getAllorder_details() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM order_details", (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static getorder_detailsById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM order_details WHERE Order_Detail_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static getOrder_DetailsByOrder_ID(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
          products.Product_Name,
          order_details.Quantity,
          order_details.Price,
          order_details.Order_Detail_ID
        FROM order_details
          JOIN products ON order_details.Product_ID = products.Product_ID
        WHERE Order_ID = ?`,
        id,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static createorder_details(order_details) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO order_details SET ?", order_details, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static updateorder_details(id, order_details) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE order_details SET ? WHERE Order_Detail_ID = ?",
        [order_details, id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static deleteorder_details(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM order_details WHERE Order_Detail_ID = ?",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
}
module.exports = order_details;
