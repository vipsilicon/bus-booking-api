import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Users from '../../models/Users';
import UserSessions, { UserSessionStatus } from '../../models/UserSession';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

export class AuthController {

    public static async signUp(req: Request, res: Response, next: NextFunction){
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

                const accessToken = jwt.sign({ 
                    id: user.id,
                    name: user.name,
                    email: user.email 
                }, config.JWT_SECRET, { expiresIn: '1h' });
                
                const refreshToken = jwt.sign({ 
                    id: user.id,
                    name: user.name,
                    email: user.email
                }, config.JWT_SECRET, { expiresIn: '2h'})
                
                await UserSessions.create({ user_id: user.id, accessToken, refreshToken, status: UserSessionStatus.LOGIN});

                res.status(200).json({
                    accessToken,
                    refreshToken,
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

    public static async logout(req: Request, res: Response, next: NextFunction){
        try{
            const accessToken = req.headers['authorization']?.toString()?.split(' ')[1];
            if(accessToken){
                const existingUserSessions = await UserSessions.findOne({ where: { accessToken }});
                if(existingUserSessions){
                    await UserSessions.update(
                        { status: UserSessionStatus.LOGOUT},
                        { where: { accessToken }}
                    )
                    res.status(200).json({ 
                        message: 'Logged out successfully...'
                    });
                } else {
                    res.status(401).json({ 
                        message: 'Invalid token...'
                    });
                }
            } else {
                res.status(401).json({ 
                        message: 'No token provided...'
                    });
            }

        } catch(error){
            console.error(error);

            // Ensure this only runs if no response was already sent
            if (!res.headersSent) {
                res.status(500).json({ message: 'Internal server error' });
            }
        }

    }

    public static async refreshToken(req: Request, res: Response, next: NextFunction){
        try{
            const _refreshToken = req.headers['authorization']?.toString()?.split(" ")[1];

            if(!_refreshToken){
                res.status(401).json({
                    message: 'Unauthorized : No refresh Token provided'
                });
            } else {

                const existRefreshToken = await UserSessions.findOne({ 
                    where: {refreshToken: _refreshToken}}
                );

                if(!existRefreshToken){
                    res.status(401).json({
                        message: 'Unauthorized: Refresh Token not exist'
                    });
                } else {
                    if(existRefreshToken.status == UserSessionStatus.LOGOUT){
                        res.status(401).json({
                            message: 'Unauthorized: user already logout'
                        });
                    } else {
                        jwt.verify(_refreshToken, config.JWT_SECRET, async (error:any, decode:any) => {
                            if(error){
                                if(error.name === 'TokenExpiredError'){
                                    res.status(401).json({
                                        message: 'Unauthorized: refreshToken expired.'
                                    });
                                } else {
                                    res.status(401).json({
                                        message: 'Unauthorized: refreshToken invalid.'
                                    });
                                }
                            } else {
    
                                const accessToken = jwt.sign({
                                    id: decode.id,
                                    name: decode.name,
                                    email: decode.email
                                }, config.JWT_SECRET, { expiresIn: '1h'});
    
                                const refreshToken = jwt.sign({
                                    id: decode.id,
                                    name: decode.name,
                                    email: decode.email
                                }, config.JWT_SECRET, { expiresIn: '1h'});
    
                                await UserSessions.create({ 
                                    user_id: decode.id, 
                                    accessToken, 
                                    refreshToken,
                                    status: UserSessionStatus.REFRESH_TOKEN
                                });
    
                                await UserSessions.update(
                                    { status: UserSessionStatus.TOKEN_EXPIRED },
                                    { where: { refreshToken: _refreshToken }}
                                )
                                
                                res.status(200).json({ 
                                    accessToken,
                                    refreshToken,
                                    name: decode.name,
                                    email: decode.email
                                });
                            }
                        });
                    }
                }
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