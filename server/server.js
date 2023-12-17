const express = require('express');
const app = express();
const port= process.env.PORT || 5000;




app.listen(port, ()=> console.log(`Node JS server is running on port ${port}`));

// Path: server/server.js