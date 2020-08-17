const router = require("express").Router()
const { getAllHistory,getHistoryById,patchHistory,postHistory } = require("../controller/history")
//GET
router.get("/", getAllHistory);
router.get("/:id", getHistoryById);


//POST
router.post("/",postHistory)

//PATCH
router.patch("/:id",patchHistory)

module.exports = router