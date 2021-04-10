const router = require("express").Router();

const users = require("./users.js");

router.use("/auth", users);

module.exports = router;
