const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const db = require("./config/connection");
const companyRoute = require("./Routes/company");
const userRoute = require("./Routes/user");
const path = require("path");

env.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [],
    credentials: true,
  })
);

db.connect((err) => {
  err
    ? console.error("error in db conncetion",err)
    : console.log("Database connected");
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/company", companyRoute);
app.use("/user", userRoute);

app.listen(PORT, (err) => {
  err
    ? console.error("Port configuration error:", err)
    : console.log(`server listening to :${PORT}`);
});

module.exports = app;
