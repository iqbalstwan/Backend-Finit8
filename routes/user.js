const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  patchUser,
  deleteUser,
} = require("../controller/user");
const { adminAuthor, generalAuthor } = require("../middleware/author");

router.post("/register", registerUser);

router.get("/login", loginUser);
router.get("/", adminAuthor, getAllUser);
router.get("/:id", adminAuthor, getUserById);

router.patch("/update/:id", adminAuthor, patchUser);

router.delete("/delete/:id", adminAuthor, deleteUser);

module.exports = router;
