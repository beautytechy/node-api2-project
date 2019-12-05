const db = require("../data/db.js");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.post("/", (req, res) => {
    const postData = req.body;
    db.insert(postData)
        .then(post => {
            if (postData.title && postData.contents) {
                res.status(201).json(postData);
            } else {
                res
                    .status(404)
                    .json({ error: "Please provide title and contents for the post." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });

});

router.post("/:id/comments", (req, res) => {
    const id = req.params.id;
    const commentData = req.body;
    db.insertComment(commentData)
        .then(comment => {
            console.log(comment);
            if (comment.post_id && comment.text) {
                res.status(201).json(commentData);
            } else {
                res
                    .status(404)
                    .json({ error: "Please provide text for the comment." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });

});

module.exports = router;