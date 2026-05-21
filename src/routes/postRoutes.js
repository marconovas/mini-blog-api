import { Router } from "express";
import { deletePost, editPost, getAllPosts, getPostById, newPost} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCommentsByPost, newComment } from "../controllers/commentController.js";
import { createPostValidator, deletePostValidator, getPostByIdValidator, postIdValidator, updatePostValidator } from "../middleware/validators/post.validator.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", 
    postIdValidator,
    validate,
    authorize("ADMIN", "USER"),
    getPostById
);
router.get("/:id/comments", 
    postIdValidator,
    validate,
    authorize("ADMIN", "USER"),
    getCommentsByPost
); //GET COMMENTS BY POST

//AUTH PATHS
router.post("/", 
    authMiddleware,
    createPostValidator,
    validate,
    authorize("ADMIN", "USER"),
    newPost
);
router.post("/:id/comments", 
    authMiddleware, 
    getPostByIdValidator,
    validate,
    authorize("ADMIN", "USER"),
    newComment
);
router.put("/:id", 
    authMiddleware, 
    updatePostValidator,
    validate,
    authorize("ADMIN", "USER"),
    editPost
);
router.delete("/:id", 
    authMiddleware,
    deletePostValidator,
    validate, 
    authorize("ADMIN", "USER"),   
    deletePost
);

export default router;