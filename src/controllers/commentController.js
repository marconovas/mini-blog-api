import * as CommentService from "../services/commentService.js";

export async function getAllComments (req, res) {
    try{
        const comments = await CommentService.getComments();

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

export async function getCommentById (req, res) {
    const commentId = req.params.id;

    try{
        const comment = await CommentService.getCommentById(commentId);

        if(!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not Found."
            });
        }

        return res.status(200).json({
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

export async function getCommentsByUser(req, res) {
    const { id } = req.params;
    
    try{
        const comments = await CommentService.commentsByUser(id);

        return res.status(200).json({
            success: true,
            comments
        });

    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export async function getCommentsByPost (req, res) {
    const postId = req.params.id;

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
    const postId = req.params.id;
    const userId = req.user.userId;

    try{
        const comment = await CommentService.newComment(content, userId, postId);

        return res.status(201).json({
            success: true,
            message: "Comment Created.",
            comment
        })
    } catch(error) {
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error."
        })
    }
}

export async function editComment (req, res) {
    const { content } = req.body;
    const commentId = req.params.id;
    const userId = req.user.userId;
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

        return res.status(200).json({
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
    const commentId = req.params.id;
    const userId = req.user.userId;

    try{
        const comment = await CommentService.getCommentById(commentId);

        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found."
            })
        }

        if(userId !== comment.userId && req.user.role !== "ADMIN"){
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