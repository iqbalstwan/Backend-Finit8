const connection = require("../config/mysql");

module.exports = {
  getAllHistory: (search, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE history_id LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [search, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM history",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE history_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryDay: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(history_subtotal) as Today FROM history WHERE DAY(history_created_at) = DAY(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as orders FROM history WHERE YEARWEEK(history_created_at) = YEARWEEK(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryYears: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(history_subTotal) as Years FROM history WHERE YEAR(history_created_at) = YEAR(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getRecentOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE DAY(history_created_at) = DAY(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getOrderWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE WEEK(history_created_at) = WEEK(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getOrderMonth: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE MONTH(history_created_at) = MONTH(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getChart: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT DATE(history_created_at) as date, sum(history_subtotal) as total FROM history WHERE MONTH(history_created_at) = MONTH(NOW()) AND YEAR(history_created_at) = YEAR(NOW()) GROUP BY DATE(history_created_at)",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO history SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: result.insertId,
              ...setData,
              //... mengambil semua data di setdata
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  patchHistory: (setData, history_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE history SET ? WHERE history_id = ?",
        [setData, history_id],
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: history_id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
