import * as postService from "../services/postService.js";

export async function getAllPosts (req, res) {
    try{
        const posts = await postService.posts();

        res.status(200).json({
            success: true, 
            posts
        });
    } catch(error) {
        return res.status(500).json({ 
            success: false,
            message: "Server failed."
        });
    }
}

export async function getPostById (req, res) {
    const postId = parseInt(req.params.id);
    
    if(isNaN(postId)){
        return res.status(400).json({
            success: false,
            message: "Invalid post ID."
        })
    }

    try{
        const post = await postService.postById(postId);

        if(!post){  //if post === null
            return res.status(404).json({
                success: false,
                message: "Post not Found."
            })
        }

        res.status(200).json({
            success: true, 
            post
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export async function newPost (req, res) {
    const title = req.body.title || "";
    const content = req.body.content || "";
    const userId = req.user.userId; //GRAB USER ID

    if(!title.trim() || !content.trim()){
        return res.status(400).json({
            success: false,
            message: "Provided Data is Invalid."
        })
    }

    try{
        await postService.create(userId, title, content);

        res.status(201).json({
            success: true,
            message: "New Post Created."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error."
        })
    }
}

export async function editPost (req, res) {
    const title = req.body.title || "";
    const content = req.body.content || "";
    const postId = parseInt(req.params.id);

    if(!title.trim() || !content.trim() || isNaN(postId)){
        return res.status(400).json({
            success: false,
            message: "Information not Valid."
        })
    }

    try{

        //OWNERSHIP
        //FETCH POST
        const post = await postService.postById(postId);

        //CHECK POST
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not Found."
            })
        }

        //CHECK OWNERSHIP
        if(req.user.userId !== post.userId){
            return res.status(403).json({
                success: false,
                message: "Action Forbidden."
            });
        }

        //MODIFY POST IF CHECKED
        await postService.modify(postId, title, content);

        res.status(200).json({
            success: true,
            message: "Post modified."
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

export async function deletePost (req, res) {
    const postId = parseInt(req.params.id);

    if(isNaN(postId)){
        return res.status(400).json({
            success: false,
            message: "Invalid information."
        })
    }

    try{

        //OWNERSHIP
        const post = await postService.postById(postId);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not Found."
            })
        }

        //CHECK USER ID AND POST USER ID
        if(req.user.userId !== post.userId){
            return res.status(403).json({
                success: false,
                message: "Action Forbidden."
            });
        }

        //REMOVE POST IF CHECKED
        await postService.remove(postId);

        res.status(200).json({
            success: true,
            message: "Post Removed from DB."
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}