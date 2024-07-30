var db = require("./db");
class suppliers {
  constructor() {
    this.suppliers = [];
  }
  static getAllsuppliers(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM suppliers";
      const paginatedQuery = "SELECT * FROM suppliers LIMIT ?, ?";

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
            suppliers: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          });
        });
      });
    });
  }
  static getsuppliersById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM suppliers WHERE Supplier_ID = ?",
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
  static createsuppliers(suppliers) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO suppliers SET ?", suppliers, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static updatesuppliers(id, suppliers) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE suppliers SET ? WHERE Supplier_ID = ?",
        [suppliers, id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static deletesuppliers(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM suppliers WHERE Supplier_ID = ?",
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
module.exports = suppliers;
