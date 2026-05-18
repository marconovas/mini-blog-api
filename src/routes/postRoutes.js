import { Router } from "express";
import { deletePost, editPost, getAllPosts, getPostById, newPost} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCommentsByPost, newComment } from "../controllers/commentController.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/:id/comments", getCommentsByPost); //GET COMMENTS BY POST

//AUTH PATHS
router.post("/", authMiddleware, newPost);
router.post("/:id/comments", authMiddleware, newComment);
router.put("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;