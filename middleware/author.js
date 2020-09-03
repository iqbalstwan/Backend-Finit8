const jwt = require("jsonwebtoken");
const helper = require("../helper/indexhlp");

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      //validasi token jwt
      token = token.split(" ")[1]; //tidak menampilkan bearer
      jwt.verify(token, "Secret", (error, result) => {
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          console.log(result);
          request.token = result;
          next();
        }
      });
      console.log(token);
    } else {
      return helper.response(response, 400, "Please Login ");
    }
  },
};
