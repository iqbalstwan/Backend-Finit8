const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  getHistoryDay,
  getHistoryWeek,
  getHistoryYears,
  getChart,
  getRecentOrder,
  getOrderWeek,
  getOrderMonth,
  patchHistory,
  postHistory,
} = require("../controller/history");

const { adminAuthor, generalAuthor } = require("../middleware/author");
const {
  getRedisHistory,
  getHistoryByIdRedis,
  getRedisDayIncome,
  getRedisWeekCount,
  getRedisYearsIncome,
  getRedisRecentOrder,
  getRedisOrderWeek,
  getRedisOrderMonth,
  getRedisChart,
  clearHistoryRedis,
  clearDataRedis,
} = require("../middleware/redis");
//GET
router.get("/", generalAuthor, getRedisHistory, getAllHistory);

router.get("/dashboard/day", generalAuthor, getRedisDayIncome, getHistoryDay);
router.get("/dashboard/week", generalAuthor, getRedisWeekCount, getHistoryWeek);
router.get(
  "/dashboard/years",
  generalAuthor,
  getRedisYearsIncome,
  getHistoryYears
);
router.get("/recent/order", generalAuthor, getRedisRecentOrder, getRecentOrder);
router.get("/week/order", generalAuthor, getRedisOrderWeek, getOrderWeek);
router.get("/month/order", generalAuthor, getRedisOrderMonth, getOrderMonth);
router.get("/chart", generalAuthor, getRedisChart, getChart);
router.get("/:id", generalAuthor, getHistoryByIdRedis, getHistoryById);
//POST
router.post("/", adminAuthor, postHistory);

//PATCH
router.patch("/:id", adminAuthor, clearHistoryRedis, patchHistory);

module.exports = router;
