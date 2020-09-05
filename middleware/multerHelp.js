// fs = require("fs");
const multer = require("multer");
const helper = require("../helper/indexhlp");

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (request, file, callback) => {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const limits = {
  filesize: "",
};
const fileFilter = (request, file, callback) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    //   response.fileValidationError = "Only image files are allowed!";
    return callback(new Error("Only image files are allowed!"), false);
  } else if (!limits.filesize > 1024 * 1024 * 3) {
    return callback(new Error("Too Large"), false);
  }
  callback(null, true);
};
// const limits = { fileSize: 1024 * 1024 * 1 };

let upload = multer({ storage, fileFilter }).single("product_img");

const uploadFilter = (request, response, next) => {
  upload(request, response, function (error) {
    if (error instanceof multer.MulterError) {
      return helper.response(response, 400, error.message);
    } else if (error) {
      return helper.response(response, 400, error.message);
      // An unknown error occurred when uploading.
    }
    next();
    // Everything went fine.
  });
};

module.exports = uploadFilter;
