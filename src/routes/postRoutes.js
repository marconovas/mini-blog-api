import { Router } from "express";
import { deletePost, editPost, getAllPosts, getPostById, newPost} from "../controllers/postController.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", newPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);

export default router;