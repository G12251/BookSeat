const express = require('express');
const cors = require('cors');

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const app = express(); // Declare 'app' first
app.use(express.json()); // Then use 'app'

app.use(cors());

const usersRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const cinemasRoute = require("./routes/cinemasRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/cinemas", cinemasRoute);
app.use("/api/bookings", bookingsRoute);

const port = process.env.PORT || 5000;

const path = require("path");
__dirname = path.resolve();

// render deployment
if (process.env.NODE_ENV === "production") {
 app.use(express.static(path.join(__dirname, "/client/build")));
 app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
 });
}

app.listen(port, () =>
 console.log(`Node JS Server is running on port ${port}`)
);
