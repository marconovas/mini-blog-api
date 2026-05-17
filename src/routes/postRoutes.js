import { Router } from "express";
import { deletePost, editPost, getAllPosts, getPostById, newPost} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);

//AUTH PATHS
router.post("/", authMiddleware, newPost);
router.put("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;