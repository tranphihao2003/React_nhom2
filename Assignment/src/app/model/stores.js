var db = require('./db')
class stores {
  constructor() {
    this.stores = []
  }
  static getAllstores(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize
    const limit = pageSize

    return new Promise((resolve, reject) => {
      const countQuery = 'SELECT COUNT(*) AS total FROM stores where status = 0'
      const paginatedQuery = 'SELECT * FROM stores where status = 0 ORDER BY Store_ID LIMIT ?, ?'

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
            stores: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          })
        })
      })
    })
  }
  static getstoresById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM stores WHERE Store_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static createstores(stores) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO stores SET ?', stores, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static updatestores(id, stores) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE stores SET ? WHERE Store_ID = ?', [stores, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static deletestores(id) {
    
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM stores WHERE Store_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static backdata() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM stores WHERE status = 1', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static changeStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE stores SET status = ? WHERE Store_ID = ?', [status, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = stores
