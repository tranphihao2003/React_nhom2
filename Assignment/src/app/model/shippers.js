var db = require("./db");
class shippers {
  constructor() {
    this.shippers = [];
  }
  static getAllshippers(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM shippers";
      const paginatedQuery = "SELECT * FROM shippers ORDER BY Shipper_ID LIMIT ?, ?";

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
            shippers: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          });
        });
      });
    });
  }
  static getshippersById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM shippers WHERE Shipper_ID = ?",
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
  static createshippers(shippers) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO shippers SET ?", shippers, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static updateshippers(id, shippers) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE shippers SET ? WHERE Shipper_ID = ?",
        [shippers, id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static deleteshippers(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM shippers WHERE Shipper_ID = ?",
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
module.exports = shippers;
