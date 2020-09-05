const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  patchUser,
  deleteUser,
} = require("../controller/user");

router.post("/register", registerUser);

router.get("/login", loginUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);

router.patch("/update/:id", patchUser);

router.delete("/delete/:id", deleteUser);

module.exports = router;
