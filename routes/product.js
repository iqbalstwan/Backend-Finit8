const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  getProductByName,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");
const { authorization } = require("../middleware/author");
const {
  getProductByIdRedis,
  clearDataProductRedis,
} = require("../middleware/redis");
const multer = require("multer");
const multerHelp = require("../middleware/multerHelp");

//upload gambar
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

let upload = multer({ storage: storage, fileFilter: multerHelp.imageFilter });

//GET
router.get("/", authorization, getAllProduct);
router.get("/:id", authorization, getProductById);
router.get("/:id", authorization, getProductByIdRedis, getProductById);
router.get("/search/:keyword", getProductByName);

//POST
router.post("/", upload.single("product_img"), postProduct);

router.patch("/:id", clearDataProductRedis, patchProduct);

router.delete("/:id", clearDataProductRedis, deleteProduct);

module.exports = router;

// app.listen(3001, "127.0.0.1", () => {
//   console.log("express app is listening on hots: 127.0.0.1 and port:3001 !");
// });
