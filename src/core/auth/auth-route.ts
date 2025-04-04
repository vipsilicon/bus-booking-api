import { Router } from 'express';
import dotenv from 'dotenv';
import { AuthController } from './auth-controller';
import { 
    SIGNUP_VALIDATORS,
    LOGIN_VALIDATORS,
    LOGOUT_VALIDATORS
} from './validation/AuthValidation';
import { userMiddleware } from '../middleware/userMiddleware';

dotenv.config();

const router = Router();

router.post('/signup', 
    SIGNUP_VALIDATORS,
    AuthController.signUp
);

router.post('/login',
    LOGIN_VALIDATORS,
    AuthController.login
);

router.post('/logout',
    LOGOUT_VALIDATORS,
    userMiddleware,
    AuthController.logout
)

export default router;

