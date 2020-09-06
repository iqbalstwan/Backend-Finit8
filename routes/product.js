const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  getProductByName,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");

//MIDDLEWARE
const { adminAuthor, generalAuthor } = require("../middleware/author");
const {
  getRedisProduct,
  getProductByIdRedis,
  clearProductRedis,
  clearDataRedis,
} = require("../middleware/redis");
// const multer = require("multer");
const uploadImage = require("../middleware/multerHelp");

//GET
router.get("/", generalAuthor, getRedisProduct, getAllProduct);
router.get("/:id", generalAuthor, getProductByIdRedis, getProductById);
router.get("/:id", generalAuthor, getProductById);
router.get("/search/:keyword", getProductByName);

//POST
router.post("/", adminAuthor, uploadImage, postProduct);

router.patch("/:id", adminAuthor, uploadImage, clearProductRedis, patchProduct);

router.delete("/:id", adminAuthor, clearProductRedis, deleteProduct);

module.exports = router;

// app.listen(3001, "127.0.0.1", () => {
//   console.log("express app is listening on hots: 127.0.0.1 and port:3001 !");
// });
