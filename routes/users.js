const route = require("express").Router();
const {
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const uploadFile = require("../middleware/multer");

route.post("/register", register);
route.post("/login", login);
route.patch("/:id", uploadFile, updateUser);
route.delete("/:id", deleteUser);
module.exports = route;
