const redis = require("redis");
const client = redis.createClient();
// const helper = require("../helper/indexhlp");

module.exports = {
  getProduct: (request, response, next) => {
    const { id } = request.params;
    client.get("getproductbyid", (error, result) => {
      if (!error && result != null) {
        console.log("find your data in redis");
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        console.log("not found your data in redis");
        next();
      }
    });
  },
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get("getproductbyid", (error, result) => {
      if (!error && result != null) {
        console.log("find your data in redis");
        return helper.response(response, 200, JSON.parse(result)); //mengambil dari json stringyfy
      } else {
        console.log("not found your data in redis");
        next();
      }
    });
  },
  clearDataProductRedis: (request, response, next) => {
    client.flushall((error, result) => {
      console.log(result);
    });
    next();
  },
};
