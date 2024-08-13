var db = require('./db')

class orders {
  constructor() {
    this.orders = []
  }
  static getAllorders(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize
    const limit = pageSize

    return new Promise((resolve, reject) => {
      const countQuery = 'SELECT COUNT(*) AS total FROM orders'
      const paginatedQuery = `
      SELECT
          stores.Store_Name,
          CONCAT(employees.First_Name, ' ', employees.Last_Name) AS Employee_FullName,
          CONCAT(customers.First_Name, ' ', customers.Last_Name) AS Customer_FullName,
          orders.Order_Date,
          orders.Total_Amount,
          orders.Order_ID,
          orders.Status
      FROM orders
          JOIN stores ON orders.Store_ID = stores.Store_ID
          JOIN employees ON orders.Employee_ID = employees.Employee_ID
          JOIN customers ON orders.Customer_ID = customers.Customer_ID
      WHERE
          orders.Status IN (0, 1, 2)
      ORDER BY
          orders.Order_Date DESC
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
            orders: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          })
        })
      })
    })
  }
  static getordersById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM orders WHERE Order_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static createorders(orders) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO orders SET ?', orders, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static updateorders(id, orders) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE orders SET ? WHERE Order_ID = ?', [orders, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static deleteorders(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM orders WHERE Order_ID = ?', id, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

  static backdata() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM orders WHERE status = 1', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

  static changeStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE orders SET status = ? WHERE Order_ID = ?', [status, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  static thongkebyemployee(id, month, year) {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT 
            COUNT(*) AS Order_Count
        FROM 
            orders 
        WHERE 
            Employee_ID = ?
            AND MONTH(Order_Date) = ?
            AND YEAR(Order_Date) = ?
        `,
        [id, month, year],
        (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result[0].Order_Count) // Trả về giá trị Order_Count
          }
        },
      )
    })
  }
  static thongkebyid(id, storeId, year, month) {
    id = parseInt(id)
    storeId = parseInt(storeId)
    year = parseInt(year)
    month = parseInt(month)
    console.log(id, storeId, year, month)

    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          od.Product_ID,
          COUNT(DISTINCT o.Order_ID) AS Total_Orders,
          SUM(od.Quantity) AS Total_Quantity,
          SUM(od.Quantity * od.Price) AS Total_Revenue,
          AVG(od.Price) AS Average_Price
        FROM 
          order_details od
        JOIN 
          Orders o ON od.Order_ID = o.Order_ID
        WHERE 
          od.Product_ID = ?
          AND o.Store_ID = ?  -- Thêm điều kiện lọc theo Store_ID
          AND o.Order_Date BETWEEN 
            DATE_FORMAT(STR_TO_DATE(CONCAT(?, '-', ?, '-01'), '%Y-%m-%d'), '%Y-%m-%d') 
            AND LAST_DAY(STR_TO_DATE(CONCAT(?, '-', ?, '-01'), '%Y-%m-%d'))
        GROUP BY 
          od.Product_ID
      `

      db.query(query, [id, storeId, year, month, year, month], (err, result) => {
        console.log(result)

        if (err) {
          reject(err)
        } else {
          const stats = result[0] || {
            Product_ID: id,
            Total_Orders: 0,
            Total_Quantity: 0,
            Total_Revenue: 0,
            Average_Price: 0,
          }
          resolve(stats)
        }
      })
    })
  }
  static thongke(Store_ID, day, month, year) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          
            SUM(CASE WHEN DATE(o.Order_Date) = ? THEN od.Quantity * od.Price ELSE 0 END) AS Total_Revenue_Day,
            COUNT(DISTINCT CASE WHEN DATE(o.Order_Date) = ? THEN o.Order_ID END) AS Total_Orders_Day,
            
            
            SUM(CASE WHEN MONTH(o.Order_Date) = ? AND YEAR(o.Order_Date) = ? THEN od.Quantity * od.Price ELSE 0 END) AS Total_Revenue_Month,
            COUNT(DISTINCT CASE WHEN MONTH(o.Order_Date) = ? AND YEAR(o.Order_Date) = ? THEN o.Order_ID END) AS Total_Orders_Month
        FROM 
            order_details od
        JOIN 
            orders o ON od.Order_ID = o.Order_ID
        WHERE 
            o.Store_ID = ?;
      `
      db.query(query, [day, day, month, year, month, year, Store_ID], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result[0])
        }
      })
    })
  }
}
module.exports = orders
