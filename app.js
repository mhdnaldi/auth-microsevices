require("dotenv").config();
const routes = require("./routes/index");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
app.use(express.static("uploads"));

app.listen(process.env.PORT, (err) => {
  console.log(`LISTENING ON PORT ${process.env.PORT}`);
});

app.use("*", (err, res) => {
  return res.status(404).json({
    status: false,
    message: "404 PAGE NOT FOUND",
  });
});
