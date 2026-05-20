import { body, param } from "express-validator";

export const getUserByIdValidator = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid ID")
        .toInt()
]

export const registerUserValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid Email.")
        .normalizeEmail(),
    
    body("password")
        .notEmpty()
        .withMessage("Password is Required.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters.")
]

export const loginUserValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid Email.")
        .normalizeEmail(),
    
    body("password")
        .notEmpty()
        .withMessage("Password is Required.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters.")
]