const router = require("express").Router()
const { getAllOrder,getOrderById,postOrder} = require("../controller/order")
//GET
router.get("/", getAllOrder);
router.get("/:id", getOrderById);


//POST
router.post("/", postOrder)

module.exports = router