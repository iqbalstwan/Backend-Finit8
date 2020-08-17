const router = require("express").Router()
const { getAllProduct,getProductById,getProductByName,postProduct,patchProduct,deleteProduct } = require("../controller/product")
//GET
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.get('/search/:keyword', getProductByName);


//POST
router.post("/", postProduct)

router.patch("/:id", patchProduct )

router.delete("/:id", deleteProduct )

module.exports = router

// app.listen(3001, "127.0.0.1", () => {
//   console.log("express app is listening on hots: 127.0.0.1 and port:3001 !");
// });
