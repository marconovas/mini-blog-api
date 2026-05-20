import { Router } from "express";
import { deleteComment, editComment, getAllComments, getCommentById, newComment } from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { deleteCommentValidator, editCommentValidator, getCommentByIdValidator } from "../middleware/validators/comment.validator.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getAllComments);
router.get("/:id", 
    getCommentByIdValidator,
    validate,
    getCommentById
);

router.put("/:id", 
    authMiddleware, 
    editCommentValidator,
    validate,
    editComment
);
router.delete("/:id", 
    authMiddleware, 
    deleteCommentValidator,
    validate,
    deleteComment
);

export default router;