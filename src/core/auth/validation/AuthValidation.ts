import { body, header, ValidationChain } from 'express-validator';

export const SIGNUP_VALIDATORS: ValidationChain[] = [
    body('email', 'It should be an valid email address')
        .isString().trim().isEmail().normalizeEmail(),
    body('password', 'It should not be empty and should be an valid string')
        .isString().isLength({ min: 1}),
    body('name', 'It should be valid string')
        .isString()
];

export const LOGIN_VALIDATORS: ValidationChain[] = [
    body('email', 'It should be an valid email address')
        .isString().trim().isEmail().normalizeEmail(),
    body('password', 'It should not be empty and should be an valid string')
        .isString().isLength({ min: 1})
];

export const LOGOUT_VALIDATORS: ValidationChain[] = [
    header('authorization', 'Authorization header is required')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Authorization must be a valid string')
    .matches(/^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$/)
    .withMessage('Authorization must be a valid Bearer token')
];

export const REFRESH_TOKEN_VALIDATORS: ValidationChain[] = [
    header('authorization', 'Authorization header is required')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Authorization must be a valid string')
    .matches(/^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$/)
    .withMessage('Authorization must be a valid Bearer token')
]