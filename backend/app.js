const express = require("express");
const bodyParer = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");
const { createShorthandPropertyAssignment } = require("typescript");

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

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        // console.log(result);
        console.log(post);
        res.status(201).json({
            message: "Data Send Successfully !!",
            postId: createdPost._id
        });
    });
});

app.get('/api/posts', (req, res, next) =>{
    Post.find()
    .then(data => {
        console.log(data);
        res.status(202).json({
            message: "Posts fetch successfully !!",
            posts: data
        });
    })
})

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
    .then(result => {
        // console.log(result);
        res.status(200).json({
            message: "Post Deleted !!"
        })
    }) 
    
})


module.exports = app;