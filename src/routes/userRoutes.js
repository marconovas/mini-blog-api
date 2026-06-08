import { Router } from "express";
import { deleteUserById, getPrivateUserInfo, getUserById, getUsers, updateUser } from "../controllers/userController.js";
import { getUserByIdValidator } from "../middleware/validators/auth.validator.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authorize.js";
import { getCommentsByUser } from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", 
    getUserByIdValidator,
    validate,
    getUserById
);

router.patch("/:id",
    authMiddleware,
    getUserByIdValidator,
    validate,
    authorize("ADMIN", "USER"),
    updateUser
);

router.delete("/:id",
    authMiddleware,
    getUserByIdValidator,
    validate,
    authorize("ADMIN", "USER"),
    deleteUserById
);

router.get("/:id/comments",
    getUserByIdValidator,
    validate,
    authorize("ADMIN", "USER"),
    getCommentsByUser
)

//ADMIN
router.get("/:id/admin",
    authMiddleware, 
    getUserByIdValidator,
    validate,
    authorize("ADMIN"),
    getPrivateUserInfo
);

export default router;