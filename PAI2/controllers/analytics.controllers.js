const PostModel = require("../models/post.models")


const topActiveUsers = async(req,res)=>{
    try{
        await PostModel.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalPosts: { $sum: 1 },
                    totalUpvotes: { $sum: "$upvotes" }
                }
            },
            {
                $sort:{ totalUpvotes: -1 }
            },
            {
                $limit:3
            }
        ])
    }
    catch(err){
        res.status(400).send({Msg:"Something went wrong"})
    }
}

const mostUpvotedPosts = async(req,res)=>{
    try{
        await PostModel.aggregate([
            {
                $group: {
                    _id: "$postId",
                    totalUpvotes: { $sum: "$upvotes" }
                }
            },
            {
                $sort:{ totalUpvotes: -1 }
            },
            {
                $limit:3
            }
        ])
    }
    catch(err){
        res.status(400).send({Msg:"Something went wrong"})
    }
}

module.exports={
    topActiveUsers,
    mostUpvotedPosts
}