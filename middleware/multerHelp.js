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

// const limits = {
//   filesize: 1 * 3,
// };

const fileFilter = (request, file, callback) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    return callback(
      new Error(
        "Invalid file type. Only jpg,jpeg and png image files are allowed."
      ),
      false
    );
  }
  // else if (file.originalname.length > limits) {
  //   return callback(new Error("Too Large"), false);
  // }
  else {
    callback(null, true);
  }
};
// const limits = {
//   filesize: 10,
// };

let upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
}).single("product_img");

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
