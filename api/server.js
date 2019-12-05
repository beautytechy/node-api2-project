const express = require('express');
const db = require("../data/db.js");
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Blog Posts API</h2>`);
});

server.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => {
            console.log(posts);
            res.status(200).json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "The posts information could not be retrieved" });
        });
});

server.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post && post.length) {
                res.status(200).json(post)
            } else {
                res.status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log("error from GET/:id", error);
            res
                .status(500)
                .json({ error: "The post information could not be retrieved." });
        });
});

server.get("/api/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    db.findCommentById(id)
        .then(comments => {
            if (comments && comments.length) {
                res.status(200).json(comments)
            } else {
                res.status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log("error from GET/:id", error);
            res
                .status(500)
                .json({ error: "The comments information could not be retrieved." });
        });
});

server.delete("/api/posts/:id/", (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: "Post deleted" })
            } else {
                res.status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log("error from DELETE/:id", error);
            res
                .status(500)
                .json({ error: "The post could not be removed." });
        });
});

server.put("/api/posts/:id/", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(changes => {
            if (changes) {
                res.status(200).json(changes);
            } else if(id) {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist.." })
            } else {
                res.status(400)
                    .json({ errorMessage: "Please provide title and contents for the post." })
            }
        })
        .catch(error => {
            console.log("error from PUT/:id", error);
            res
                .status(500)
                .json({ error: "The post information could not be modified." });
        });
});
module.exports = server; 