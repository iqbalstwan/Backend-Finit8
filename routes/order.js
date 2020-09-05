const router = require("express").Router();
const { getAllOrder, getOrderById, postOrder } = require("../controller/order");

const { adminAuthor, generalAuthor } = require("../middleware/author");
const {
  getRedisOrder,
  getOrderByIdRedis,
  clearOrderRedis,
  clearDataRedis,
} = require("../middleware/redis");

//GET
router.get("/", generalAuthor, getRedisOrder, getAllOrder);
router.get("/:id", generalAuthor, getOrderByIdRedis, getOrderById);

//POST
router.post("/", adminAuthor, postOrder);
router.patch("/:id", adminAuthor, clearOrderRedis, postOrder);

module.exports = router;
