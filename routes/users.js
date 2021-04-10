const route = require("express").Router();
const { register, login, updateUser } = require("../controllers/users");
const uploadFile = require("../middleware/multer");

route.post("/register", register);
route.post("/login", login);
route.patch("/:id", uploadFile, updateUser);
module.exports = route;
