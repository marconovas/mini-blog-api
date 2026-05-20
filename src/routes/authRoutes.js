import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { loginUserValidator, registerUserValidator } from "../middleware/validators/auth.validator.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post("/register",
    registerUserValidator,
    validate,
    register
);
router.post("/login", 
    loginUserValidator,
    validate,
    login
);

export default router;