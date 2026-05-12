const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const posts = {}

// Gets all posts from the local variable "posts".
router.get("/", (req, res) => {
    res.json({posts: Object.values(posts)});
});

router.get("/:id", (req, res) => {
    const idPost = req.params.id;
    if(idPost && posts[idPost]){
        res.json({post: posts[idPost]});
    } else {
        res.json({msg: "Post nao encontrado."});
    }
});

router.post("/", (req, res) => {
    const post = req.body;
    const idPost = uuidv4();
    post.id = idPost;
    posts[idPost] = post;
    res.json({msg: "Post adicionado."});
});

router.put("/", (req, res) => {
    const idPost = req.query.id;
    if(idPost && posts[idPost]){
        const post = req.body;
        post.id = idPost;
        posts[idPost] = post;   
        res.json({msg: "Post alterado com sucesso."});
    } else {
        res.status(404).json({msg: "Post nao encontrado."});
    }
});

router.delete("/", (req, res) => {
    const idPost = req.query.id;
    if(idPost && posts[idPost]){
        delete posts[idPost];
        res.json({msg: "Post deletado com sucesso."});
    } else {
        res.status(404).json({msg: "Post nao encontrado."});
    }
});

module.exports = router;