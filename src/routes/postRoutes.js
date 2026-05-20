import { Router } from "express";
import { deletePost, editPost, getAllPosts, getPostById, newPost} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCommentsByPost, newComment } from "../controllers/commentController.js";
import { createPostValidator, deletePostValidator, getPostByIdValidator, postIdValidator, updatePostValidator } from "../middleware/validators/post.validator.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", 
    postIdValidator,
    validate,
    getPostById
);
router.get("/:id/comments", 
    postIdValidator,
    validate,
    getCommentsByPost
); //GET COMMENTS BY POST

//AUTH PATHS
router.post("/", 
    authMiddleware,
    createPostValidator,
    validate,
    newPost
);
router.post("/:id/comments", 
    authMiddleware, 
    getPostByIdValidator,
    validate,
    newComment
);
router.put("/:id", 
    authMiddleware, 
    updatePostValidator,
    validate,
    editPost
);
router.delete("/:id", 
    authMiddleware,
    deletePostValidator,
    validate,    
    deletePost
);

export default router;