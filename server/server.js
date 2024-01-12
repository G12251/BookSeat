const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
app.use(cors());

const usersRoute = require("./routes/usersRoute");

app.use("/api/users", usersRoute);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Node JS server is running on port ${port}`)
);
