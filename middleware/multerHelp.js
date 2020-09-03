fs = require("fs");
const helper = require("../helper/indexhlp");

module.exports = {
  imageFilter: (response, file, callback) => {
    const limits = {
      fileSize: 30,
    };
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      //   response.fileValidationError = "Only image files are allowed!";
      return callback(new Error("Only image files are allowed!"), false);
    } else if (!limits.fileSize <= 30) {
      return callback(new Error("Too Large"), false);
    }
    callback(null, true);
  },
};
