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
        // console.log("find your data in redis");
        return helper.response(
          response,
          200,
          "Success get data",
          JSON.parse(result)
        ); //mengambil dari json stringyfy
      } else {
        // console.log("not found your data in redis");
        next();
      }
    });
  },

  //CATEGORY
  getRedisCategory: (request, response, next) => {
    client.get("getcategory", (error, result) => {
      if (!error && result != null) {
        console.log("find your category in redis");
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        console.log("not found your data in redis");
        next();
      }
    });
  },
  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get("getcategorybyid", (error, result) => {
      if (!error && result != null) {
        console.log("find your category in redis");
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        console.log("not found your data in redis");
        next();
      }
    });
  },

  //ORDER
  getRedisOrder: (request, response, next) => {
    client.get("getorder", (error, result) => {
      if (!error && result != null) {
        console.log("find your category in redis");
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        console.log("not found your data in redis");
        next();
      }
    });
  },
  getOrderByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get("getorderbyid", (error, result) => {
      if (!error && result != null) {
        console.log("find your category in redis");
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        console.log("not found your data in redis");
        next();
      }
    });
  },

  //HISTORY
  getRedisHistory: (request, response, next) => {
    client.get("gethistory", (error, result) => {
      if (!error && result != null) {
        console.log("find your category in redis");
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        console.log("not found your data in redis");
        next();
      }
    });
  },
  getHistoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get("getcategorybyid", (error, result) => {
      if (!error && result != null) {
        console.log("find your category in redis");
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        console.log("not found your data in redis");
        next();
      }
    });
  },

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
