const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/Files", express.static(path.join(__dirname, "Files")));
app.use("/Images", express.static(path.join(__dirname, "Images")));
app.use("/Arts", express.static(path.join(__dirname, "Arts")));
app.use("/portfolio", express.static(path.join(__dirname, "portfolio")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes
const authentication = require("./routes/auth");
const users = require("./routes/user");

// Use routes
app.use("/api/v1", authentication);
app.use("/api/v1", users);

app.use(errorMiddleware);

module.exports = app;
