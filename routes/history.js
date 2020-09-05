const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  getHistoryDay,
  getHistoryWeek,
  getHistoryYears,
  getChart,
  getRecentOrder,
  patchHistory,
  postHistory,
} = require("../controller/history");

const { adminAuthor, generalAuthor } = require("../middleware/author");
const {
  getRedisHistory,
  getHistoryByIdRedis,
  clearHistoryRedis,
  clearDataRedis,
} = require("../middleware/redis");
//GET
router.get("/", generalAuthor, getRedisHistory, getAllHistory);

router.get("/dashboard/day", getHistoryDay);
router.get("/dashboard/week", getHistoryWeek);
router.get("/dashboard/years", getHistoryYears);
router.get("/recent/order", getRecentOrder);
router.get("/chart", getChart);
router.get("/:id", generalAuthor, getHistoryByIdRedis, getHistoryById);
//POST
router.post("/", postHistory);

//PATCH
router.patch("/:id", adminAuthor, clearHistoryRedis, patchHistory);

module.exports = router;
