import { Router } from "express";
import { deleteComment, editComment, getAllComments, getCommentById, newComment } from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { deleteCommentValidator, editCommentValidator, getCommentByIdValidator } from "../middleware/validators/comment.validator.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.get("/", getAllComments);
router.get("/:id", 
    getCommentByIdValidator,
    validate,
    authorize("ADMIN", "USER"),
    getCommentById
);

router.put("/:id", 
    authMiddleware, 
    editCommentValidator,
    validate,
    authorize("ADMIN", "USER"),
    editComment
);
router.delete("/:id", 
    authMiddleware, 
    deleteCommentValidator,
    validate,
    authorize("ADMIN", "USER"),
    deleteComment
);

export default router;