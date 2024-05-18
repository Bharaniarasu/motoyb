const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const bikeRoute = require("./routes/bikeRoute");
const adminRoute = require("./routes/adminRoute");

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const cors = require("cors");
const cookieparser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieparser());

app.use("/api/v1/user", authRoute);
app.use("/api/v1/bikes", bikeRoute);
app.use("/api/v1/admin", adminRoute);
app.use(errorMiddleware);
module.exports = app;
