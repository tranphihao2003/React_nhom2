var db = require("./db");
class products {
  constructor() {
    this.products = [];
  }
  static getAllproducts(page = 1, pageSize = 5) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM products";
      const paginatedQuery = "SELECT * FROM products LIMIT ?, ?";

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
            products: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          });
        });
      });
    });
  }
  static getproductsById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM products WHERE Product_ID = ?",
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
  static createproducts(products) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO products SET ?", products, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static updateproducts(id, products) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE products SET ? WHERE Product_ID = ?",
        [products, id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static deleteproducts(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM products WHERE Product_ID = ?",
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
module.exports = products;
