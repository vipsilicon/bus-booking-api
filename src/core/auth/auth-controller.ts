import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Users from '../../models/Users';
import UserSessions from '../../models/UserSession';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

export class AuthController {

    public static async signUp(req: Request, res: Response, next: NextFunction){
        // console.log(req.body);
        // res.status(200).json(req.body);
        try{
            const { email, password, name } = req.body;
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).json({ errors: errors.array() });
            }
            const existingUser = await Users.findOne({ where: { email }});
            if(existingUser){
                res.status(400).json({
                    message: 'User already exists'
                });
            } 
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await Users.create({ email, password: hashedPassword, name });
            res.status(201).json({
                message: 'User registered successfully',
                user
            });
        } catch(error){
            console.error(error);

            // Ensure this only runs if no response was already sent
            if (!res.headersSent) {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction){
        try{
            const { email, password } = req.body;
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).json({ errors: errors.array() });
            }
            const user = await Users.findOne({ where: { email }});
            if(!user){
                res.status(401).json({
                    message: 'Invalid username or password'
                });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch){
                    res.status(401).json({
                        message: 'Invalid username or password'
                    });
                }

                const token = jwt.sign({ id: user.id }, config.jwt_SECRET, { expiresIn: '1h' });

                await UserSessions.create({ user_id: user.id, token});

                res.status(200).json({
                    token: token,
                    name: user.name,
                    email: user.email
                })
            }

        } catch(error){
            console.error(error);

            // Ensure this only runs if no response was already sent
            if (!res.headersSent) {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}