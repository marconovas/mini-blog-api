import * as CommentService from "../services/commentService.js";

export async function getAllComments (req, res) {
    try{
        const comments = await CommentService.getComments();

        res.status(200).json({
            success: true,
            comments
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export async function getCommentById (req, res) {
    const commentId = parseInt(req.params.id);

    if(isNaN(commentId)){
        return res.status(400).json({
            success: false,
            message: "Missing or Invalid Data."
        });
    }

    try{
        const comment = await CommentService.getCommentById(commentId);

        if(!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not Found."
            });
        }

        res.status(200).json({
            success: true,
            comment
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export async function getCommentsByPost (req, res) {
    const postId = parseInt(req.params.id);

    if(isNaN(postId)){
        return res.status(400).json({
            success: false,
            message: "Invalid ID."
        });
    }

    try{
        const comments = await CommentService.getCommentsByPost(postId);

        return res.status(200).json({
            success: true,
            comments
        });

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export async function newComment (req, res) {
    const { content } = req.body;
    const postId = parseInt(req.params.id);
    const userId = req.user.userId;

    if(!content || !content.trim() || isNaN(postId)){
        return res.status(400).json({
            success: false,
            message: "Missing Data."
        });
    }

    try{
        const comment = await CommentService.newComment(content, userId, postId);

        res.status(201).json({
            success: true,
            message: "Comment Created.",
            comment
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error."
        })
    }
}

export async function editComment (req, res) {
    const { content } = req.body;
    const commentId = parseInt(req.params.id);
    const userId = req.user.userId;

    if(!content || !content.trim() || isNaN(commentId)){
        return res.status(400).json({
            success: false,
            message: "Invalid Data."
        })
    }

    try{
        const comment = await CommentService.getCommentById(commentId);
    
        if(!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found."
            });
        }

        if(userId !== comment.userId){
            return res.status(403).json({
                success: false,
                message: "Action Forbidden."
            });
        }

        const updatedComment = await CommentService.modifyComment(commentId, content);

        res.status(200).json({
            success: true,
            message: "Comment Successfully Modified.",
            updatedComment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export async function deleteComment (req, res) {
    const commentId = parseInt(req.params.id);
    const userId = req.user.userId;

    if(!userId || isNaN(commentId)){
        return res.status(400).json({
            success: false,
            message: "Missing or Invalid Data."
        });
    } 

    try{
        const comment = await CommentService.getCommentById(commentId);

        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found."
            })
        }

        if(userId !== comment.userId){
            return res.status(403).json({
                success: false,
                message: "Action Forbidden."
            })
        }

        await CommentService.removeComment(commentId);

        return res.status(200).json({
            success: true,
            message: "Comment Removed."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}