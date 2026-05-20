import { body, param } from "express-validator";

export const postIdValidator = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid ID.")
        .toInt()
]

export const getPostByIdValidator = [
    ...postIdValidator
]

export const createPostValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters."),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters.")
]

export const updatePostValidator = [
    ...postIdValidator,

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters."),
    
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters."),

]

export const deletePostValidator = [
    ...postIdValidator
]