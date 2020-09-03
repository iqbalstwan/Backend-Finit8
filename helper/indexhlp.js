const { response } = require("express");

module.exports = {
  response: (response, status, msg, data, pagination) => {
    const result = {};
    result.status = status || 200;
    result.msg = msg;
    result.data = data;
    result.pagination = pagination;

    return response.status(result.status).json(result);
  },
  //   imageFilter: (response, file, callback) => {
  //     // Accept images only
  //     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
  //       return response.callback(response, 400, "Only image files are allowed!");
  //       //   request.fileValidationError = "Only image files are allowed!";
  //       //   return callback(new Error("Only image files are allowed!"), false);
  //       //   return helper.response(response, 201, "Product Created", result)
  //     }
  //     callback(null, true);
  //   },
};
