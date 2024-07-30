var db = require("./db");
class employees {
  constructor() {
    this.employees = [];
  }
  static getAllemployees(page = 1, pagesize = 5) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM employees";
      const paginatedQuery = "SELECT * FROM employees LIMIT ?, ?";

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
            employees: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          });
        });
      });
    });
  }
  static getemployeesById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM employees WHERE Employee_ID = ?",
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
  static createemployees(employees) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO employees SET ?", employees, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static updateemployees(id, employees) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE employees SET ? WHERE Employee_ID = ?",
        [employees, id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static deleteemployees(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM employees WHERE Employee_ID = ?",
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
module.exports = employees;
