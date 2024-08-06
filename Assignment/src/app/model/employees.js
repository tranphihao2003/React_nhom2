var db = require('./db')

class employees {
  constructor() {
    this.employees = []
  }
  static getAllemployees(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize
    const limit = pageSize

    return new Promise((resolve, reject) => {
      const countQuery = 'SELECT COUNT(*) AS total FROM employees'
      const paginatedQuery = `
        SELECT
          CONCAT(employees.First_Name, ' ', employees.Last_Name) AS Employee_FullName,
            employees.Salary,
            stores.Store_Name,
            employees.Position,
            employees.Status,
            employees.Employee_ID
        FROM employees
          JOIN stores ON employees.Store_ID = stores.Store_ID
        WHERE
          employees.Status IN (0)
        ORDER BY
            employees.Employee_ID DESC
      `

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
            employees: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          })
        })
      })
    })
  }

  static getemployeesById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM employees WHERE Employee_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

  static createemployees(employees) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO employees SET ?', employees, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

  static updateemployees(id, employees) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE employees SET ? WHERE Employee_ID = ?', [employees, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

  static deleteemployees(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM employees WHERE Employee_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

  static backdata() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM employees WHERE Status = 1', (err, result) => {
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
        'UPDATE employees SET Status = ? WHERE Employee_ID = ?',
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

module.exports = employees
