var db = require("./db");
class genres {
  constructor() {
    this.genres = [];
  }
  static getAllgenres(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return new Promise((resolve, reject) => {
      const countQuery = "SELECT COUNT(*) AS total FROM genres";
      const paginatedQuery = "SELECT * FROM genres ORDER BY Genre_ID DESC LIMIT ?, ?";

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
            genres: result,
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          });
        });
      });
    });
  }
  static getgenresById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM genres WHERE Genre_ID = ?", id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static creategenres(genres) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO genres SET ?", genres, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  static updategenres(id, genres) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE genres SET ? WHERE Genre_ID = ?",
        [genres, id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
  static deletegenres(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM genres WHERE Genre_ID = ?", id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}

module.exports = genres;
