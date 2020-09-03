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
//GET
router.get("/", getAllHistory);

router.get("/dashboard/day", getHistoryDay);
router.get("/dashboard/week", getHistoryWeek);
router.get("/dashboard/years", getHistoryYears);
router.get("/recent/order", getRecentOrder);
router.get("/chart", getChart);
router.get("/:id", getHistoryById);
//POST
router.post("/", postHistory);

//PATCH
router.patch("/:id", patchHistory);

module.exports = router;
