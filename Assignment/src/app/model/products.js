var db = require('./db')
class products {
  constructor() {
    this.products = []
  }
  static getAllproducts(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize
    const limit = pageSize

    return new Promise((resolve, reject) => {
      const countQuery = 'SELECT COUNT(*) AS total FROM products Where status = 0'
      const paginatedQuery =
        'SELECT * FROM products Where status = 0 ORDER BY Product_ID LIMIT ?, ?'

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
            products: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          })
        })
      })
    })
  }
  static getproductsById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products WHERE Product_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static createproducts(products) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO products SET ?', products, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static updateproducts(id, products) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE products SET ? WHERE Product_ID = ?', [products, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static Stopproduct(id) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE products SET status = 1 WHERE Product_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static deleteproducts(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM products WHERE Product_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static backdata() {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM products WHERE status = 1 ORDER BY Product_ID DESC',
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        },
      )
    })
  }
  static changeStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE products SET status = ? WHERE Product_ID = ?',
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

module.exports = products
