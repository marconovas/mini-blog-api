import { body, param } from "express-validator";

const commentIdValidator = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid ID.")
        .toInt()
]

export const getCommentByIdValidator = [
    ...commentIdValidator
]

export const getCommentsByPostValidator = [
    ...commentIdValidator
]

export const createCommentValidator = [
    ...commentIdValidator,

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required.")
        .isLength({ min: 5, max: 100 })
        .withMessage("Content must be between 5 and 100 characters.")
]

export const editCommentValidator = [
    ...commentIdValidator,

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required.")
        .isLength({ min: 5, max: 100 })
        .withMessage("Content must be between 5 and 100 characters.")
]

export const deleteCommentValidator = [
    ...commentIdValidator
]