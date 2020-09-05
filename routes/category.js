const router = require("express").Router();
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");

const { adminAuthor, generalAuthor } = require("../middleware/author");
const {
  getRedisCategory,
  getCategoryByIdRedis,
  clearCategoryRedis,
  clearDataRedis,
} = require("../middleware/redis");

//GET
router.get("/", generalAuthor, getRedisCategory, getAllCategory);
router.get("/:id", generalAuthor, getCategoryByIdRedis, getCategoryById);

//POST
router.post("/", adminAuthor, clearCategoryRedis, postCategory);

router.patch("/:id", adminAuthor, clearCategoryRedis, patchCategory);

router.delete("/:id", adminAuthor, clearCategoryRedis, deleteCategory);

module.exports = router;
