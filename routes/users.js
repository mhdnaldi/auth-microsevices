const route = require("express").Router();
const {
  register,
  login,
  updateUser,
  deleteUser,
  getProfile,
} = require("../controllers/users");
const uploadFile = require("../middleware/multer");

route.post("/register", register);
route.post("/login", login);
route.get("/:id", getProfile);
route.patch("/:id", uploadFile, updateUser);
route.delete("/:id", deleteUser);
module.exports = route;
