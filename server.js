const express = require("express");
const app = express();
const dotenv = require('dotenv');
const path = require("path");
const cookieParser = require('cookie-parser');

dotenv.config();
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongodb = require("./config/db.js");

// Import routers and upload dir
const { router: indexRouter, UPLOAD_DIR } = require("./Routes/index.routes.js");
const userRoutes = require("./Routes/user.routes.js");

// Serve static files from uploads
app.use('/uploads', express.static(UPLOAD_DIR));

// Mount routers
app.use("/", indexRouter);
app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
