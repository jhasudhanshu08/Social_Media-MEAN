const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post)
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Updated Successfully !!"
        })
    })
})

router.get("", (req, res, next) =>{
    Post.find()
    .then(data => {
        console.log(data);
        res.status(202).json({
            message: "Posts fetch successfully !!",
            posts: data
        });
    })
})

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(202).json(post);
        } else {
            res.status(404).json({
                message: "Post not found !!"
            })
        }
    })
})

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
    .then(result => {
        // console.log(result);
        res.status(200).json({
            message: "Post Deleted !!"
        })
    }) 
    
})

module.exports = router;