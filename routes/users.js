const route = require("express").Router();
const { register, login } = require("../controllers/users");

route.post("/register", register);
route.post("/login", login);

module.exports = route;
