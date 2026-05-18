import { Router } from "express";
import { deleteComment, editComment, getAllComments, getCommentById, newComment } from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);

router.put("/:id", authMiddleware, editComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;