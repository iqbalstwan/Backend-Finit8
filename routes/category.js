const router = require("express").Router()
const { getAllCategory,getCategoryById,postCategory,patchCategory,deleteCategory } = require("../controller/category")
//GET
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);


//POST
router.post("/", postCategory)

router.patch("/:id", patchCategory )

router.delete("/:id", deleteCategory )

module.exports = router