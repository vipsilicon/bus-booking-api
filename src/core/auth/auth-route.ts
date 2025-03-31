import { Router } from 'express';
import dotenv from 'dotenv';
import { AuthController } from './auth-controller';
import { 
    SIGNUP_VALIDATORS,
    LOGIN_VALIDATORS
} from './validation/AuthValidation';

dotenv.config();

const router = Router();

router.post('/signup', 
    SIGNUP_VALIDATORS,
    AuthController.signUp
);

router.post('/login',
    LOGIN_VALIDATORS,
    AuthController.login
)

export default router;

