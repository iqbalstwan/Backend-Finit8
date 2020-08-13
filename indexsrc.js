const router = require("express").Router()

//import router
const product = require("./routes/product")
const category = require("./routes/category")
const order = require("./routes/order")
const history = require("./routes/history")

router.use("/product",product)
router.use("/category",category)
router.use("/order",order)
router.use("/history",history)


module.exports = router