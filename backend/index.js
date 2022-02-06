const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
    console.log(`dayBook - Backend listening on port ${port}`)
})

connectToMongo();
