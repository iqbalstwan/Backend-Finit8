const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/indexhlp");

module.exports = {
  //PRODUCT
  getRedisProduct: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          return helper.response(
            response,
            200,
            "Success get data",
            JSON.parse(result).data,
            JSON.parse(result).page
          );
        } else {
          next();
        }
      }
    );
  },
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Success get data",
          JSON.parse(result)
        ); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },

  //CATEGORY
  getRedisCategory: (request, response, next) => {
    client.get("getcategory", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get("getcategorybyid", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },

  //ORDER
  getRedisOrder: (request, response, next) => {
    client.get("getorder", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getOrderByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get("getorderbyid", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },

  //HISTORY
  getRedisHistory: (request, response, next) => {
    client.get("gethistory", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getHistoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get("getcategorybyid", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getRedisDayIncome: (request, response, next) => {
    client.get("getdayincome", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getRedisWeekCount: (request, response, next) => {
    client.get("getweekcount", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getRedisYearsIncome: (request, response, next) => {
    client.get("getyearsincome", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getRedisRecentOrder: (request, response, next) => {
    client.get("getrecentorder", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getRedisOrderWeek: (request, response, next) => {
    client.get("getorderweek", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getRedisOrderMonth: (request, response, next) => {
    client.get("getordermonth", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },
  getRedisChart: (request, response, next) => {
    client.get("getchart", (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        next();
      }
    });
  },

  //ALL CLEAR
  clearProductRedis: (request, response, next) => {
    client.keys("getproduct*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  clearCategoryRedis: (request, response, next) => {
    client.keys("getcategory*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  clearOrderRedis: (request, response, next) => {
    client.keys("getorder*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  clearHistoryRedis: (request, response, next) => {
    client.keys("gethistory*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },

  clearDataRedis: (request, response, next) => {
    client.flushall((error, result) => {
      console.log(result);
    });
    next();
  },
};
