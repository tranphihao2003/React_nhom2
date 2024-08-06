var db = require("./db");
class store_products {
  constructor() {
    this.store_products = [];
  }
  static getAllstore_products(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM store_products";
      const paginatedQuery = "SELECT * FROM store_products ORDER BY Product_ID DESC LIMIT ?, ?";

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
            store_products: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          });
        });
      });
    });
  }
  static getstore_productsById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM store_products WHERE Store_ID = ?",
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
  static createstore_products(store_products) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO store_products SET ?",
        store_products,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static updatestore_products(id, store_products) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE store_products SET ? WHERE Store_ID = ?",
        [store_products, id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static deletestore_products(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM store_products WHERE Store_ID = ?",
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
module.exports = store_products;
