var db = require('./db')
class accounts {
  constructor() {
    this.accounts = []
  }
  static getAllaccounts(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize
    const limit = pageSize

    return new Promise((resolve, reject) => {
      const countQuery = 'SELECT COUNT(*) AS total FROM accounts'
      const paginatedQuery = 'SELECT * FROM accounts ORDER BY Account_ID  DESC LIMIT ?, ?'

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
            accounts: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          })
        })
      })
    })
  }
  static getAccountById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM accounts WHERE Account_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static createAccount(account) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO accounts SET ?', account, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static updateAccount(id, account) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE accounts SET ? WHERE Account_ID = ?', [account, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static deleteAccount(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM accounts WHERE Account_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static login(username, password) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM accounts  ac INNER JOIN employees eml ON ac.Employee_ID = eml.Employee_ID WHERE Username = ? AND Password = ?',
        [username, password],
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
module.exports = accounts
