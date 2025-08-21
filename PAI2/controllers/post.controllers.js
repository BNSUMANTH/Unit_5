const PostModel = require("../models/post.models");


const posts = async(req, res) => {
    try {
        let data = req.body;
        await PostModel.create(data)
        res.status(201).send({ msg: "Post created successfully",data })
    } catch (err) {
        res.status(400).send({ msg: "Error creating post", error: err })
    }
}

const getPosts = async (req, res) => {
    try {
        let posts = await PostModel.find().populate("author", "username email");
        res.status(200).send({ msg: "Posts retrieved successfully", data: posts })
    } catch (err) {
        res.status(400).send({ msg: "Error retrieving posts"})
    }
}

const getPostById = async (req, res) => {
    try {
        let id=req.params.id
        let post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).send({ msg: "Post not found" });
        }
        res.status(200).send({ msg: "Post retrieved successfully", data: post });
    } catch (err) {
        res.status(400).send({ msg: "Error retrieving post", error: err });
    }
}

const deletePost = async (req, res) => {
    try {
        let id=req.params.id
        let post = await PostModel.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).send({ msg: "Post not found" });
        }
        res.status(200).send({ msg: "Post deleted successfully", data: post });
    } catch (err) {
        res.status(400).send({ msg: "Error deleting post", error: err });
    }
}

module.exports = {posts,getPosts,getPostById,deletePost}
