import { Router } from "express";
import { getUserById, getUsers, newUser } from "../controllers/userController.js";
import { getUserByIdValidator } from "../middleware/validators/auth.validator.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", 
    getUserByIdValidator,
    validate,
    getUserById
);

export default router;