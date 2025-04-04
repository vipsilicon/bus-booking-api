import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import UserSessions from '../../models/UserSession';

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers['authorization']?.toString().split(' ')[1];

        if(!token){
            res.status(401).json({
                message: 'Unauthorized: No token provided.'
            });
        } else {

            const userSession = await UserSessions.findOne({ where: { token }});
            if(!userSession){
                res.status(401).json({
                    message: 'Unauthorized : User session expired or invalid.'
                });
            } else {
                jwt.verify(token, config.JWT_SECRET, (error:any, decoded:any) => {
                    if(error){
                        if(error.name === 'TokenExpiredError'){
                            res.status(401).json({
                                message: 'Unauthorized: Token expired.'
                            });
                        } else {
                            res.status(401).json({
                                message: 'Unauthorized: Token invalid.'
                            });
                        }
                    } else {
                        req.body.user = decoded
                        next();
                    }
                    
                });
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