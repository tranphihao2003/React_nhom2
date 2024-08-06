var db = require("./db");
class orders {
  constructor() {
    this.orders = [];
  }
  static getAllorders(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM orders";
      const paginatedQuery = "SELECT * FROM orders ORDER BY Order_ID DESC LIMIT ?, ?";

      db.query(countQuery, (err, countResult) => {
        if (err) {
          return reject(err);
        }
        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / pageSize);

        db.query(paginatedQuery, [offset, limit], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve({
            orders: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          });
        });
      });
    });
  }
  static getordersById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM orders WHERE Order_ID = ?", id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static createorders(orders) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO orders SET ?", orders, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static updateorders(id, orders) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE orders SET ? WHERE Order_ID = ?",
        [orders, id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static deleteorders(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM orders WHERE Order_ID = ?", id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
module.exports = orders;
