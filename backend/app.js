const express = require("express");
const bodyParer = require("body-parser");
const mongoose = require("mongoose");

const { createShorthandPropertyAssignment } = require("typescript");

const postRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://mean:mean123@cluster0.3n3vd.mongodb.net/mean?retryWrites=true&w=majority")
.then(() => {
    console.log("Database is connected !!")
})
.catch(err => {
    console.log("Ohhh No Error ", err);
})

app.use(bodyParer.json());
app.use(bodyParer.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next();
})

app.use("/api/posts", postRoutes);


module.exports = app;