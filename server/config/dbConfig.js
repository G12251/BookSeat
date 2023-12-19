const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB connection Succesful");
});

connection.on("error", (err) => {
  console.log("Mongo DB Connection failed");
});

// const mongoose = require("mongoose");

// mongoose.connect(process.env.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

// const connection = mongoose.connection;

// connection.on("connected", () => {
//   console.log("Mongo DB connection successful");
// });

// connection.on("error", (err) => {
//   console.error("Mongo DB connection failed:", err);
// });

// module.exports = connection;
