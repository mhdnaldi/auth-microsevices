const router = require("express").Router();

const users = require("./users.js");

router.use("/users", users);

module.exports = router;
