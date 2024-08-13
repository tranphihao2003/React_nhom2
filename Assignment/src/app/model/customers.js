var db = require('./db')
class customers {
  constructor() {
    this.customers = []
  }
  static getAllcustomers(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize
    const limit = pageSize

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM customers WHERE Status = 0";
      const paginatedQuery = "SELECT * FROM customers WHERE Status = 0 ORDER BY Customer_ID DESC LIMIT ?, ?";

      db.query(countQuery, (err, countResult) => {
        if (err) {
          return reject(err)
        }
        const totalItems = countResult[0].total
        const totalPages = Math.ceil(totalItems / pageSize)

        db.query(paginatedQuery, [offset, limit], (err, result) => {
          if (err) {
            return reject(err)
          }
          resolve({
            customers: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          })
        })
      })
    })
  }
  static getcustomersById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM customers WHERE Customer_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static createcustomers(customers) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO customers SET ?', customers, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static updatecustomers(id, customers) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE customers SET ? WHERE Customer_ID = ?', [customers, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static deletecustomers(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM customers WHERE Customer_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static backdata() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM customers WHERE Status = 1', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static changeStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE customers SET Status = ? WHERE Customer_ID = ?',
        [status, id],
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        },
      )
    })
  }
}
module.exports = customers
