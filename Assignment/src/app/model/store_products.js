var db = require('./db');

class store_products {
  constructor() {
    this.store_products = []
  }

  static getAllstore_products(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM store_products WHERE status = 0";
      const paginatedQuery = "SELECT * FROM store_products WHERE status = 0 ORDER BY store_products_ID LIMIT ?, ?";

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
  static getStore_product_ByID(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
              products.Product_ID,
              products.Product_Name,
              store_products.Product_Stock
          FROM
              store_products JOIN products ON store_products.Product_ID = products.Product_ID
          WHERE
              store_products.Store_ID = ? `,
        id,
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        },
      )
    })
  }
  static getProductBy_ID(store_id, product_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
            store_products.Product_ID,
            products.Product_Name,
            products.Product_Price,
            store_products.Product_Stock
          FROM store_products 
          JOIN products ON store_products.Product_ID = products.Product_ID
          WHERE store_products.Store_ID = ? AND store_products.Product_ID = ?`,
        [store_id, product_id], // Chuyển các tham số thành một mảng
        (err, result) => {
          if (err) {
            return reject(err); // Trả về lỗi nếu có
          }

          if (result.length === 0) {
            return reject(new Error('Không tìm thấy sản phẩm')); // Trả về lỗi nếu không tìm thấy sản phẩm
          }

          resolve(result[0]); // Trả về sản phẩm đầu tiên tìm thấy
        },
      );
    });
  }

  static getstore_productsById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM store_products WHERE store_products_ID = ?",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static createstore_products(store_products) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO store_products SET ?', store_products, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updatestore_products(id, store_products) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE store_products SET ? WHERE store_products_ID = ?",
        [store_products, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static deletestore_products(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM store_products WHERE store_products_ID = ?",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static backdata() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM store_products WHERE status = 1', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static changeStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE store_products SET status = ? WHERE store_products_ID = ?', [status, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = store_products;
