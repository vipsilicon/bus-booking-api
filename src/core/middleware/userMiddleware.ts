import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import UserSessions, { UserSessionStatus } from '../../models/UserSession';

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const accessToken = req.headers['authorization']?.toString().split(' ')[1];

        if(!accessToken){
            res.status(401).json({
                message: 'Unauthorized: No accessToken provided.'
            });
        } else {

            const userSession = await UserSessions.findOne({ where: { accessToken }});
            if(!userSession){
                res.status(401).json({
                    message: 'Unauthorized : User session expired or invalid.'
                });
            } else {
                jwt.verify(accessToken, config.JWT_SECRET, async (error:any, decoded:any) => {
                    if(error){
                        if(error.name === 'TokenExpiredError'){
                            res.status(401).json({
                                message: 'Unauthorized: accessToken expired.'
                            });
                        } else {
                            res.status(401).json({
                                message: 'Unauthorized: accessToken invalid.'
                            });
                        }
                    } else {
                        if(userSession.status == UserSessionStatus.LOGOUT){
                            res.status(401).json({
                                message: 'Unauthorized: user already logout.'
                            });
                        } else if(userSession.status == UserSessionStatus.TOKEN_EXPIRED){
                            res.status(401).json({
                                message: 'Unauthorized: accessToken expired.'
                            });
                        } else {
                            await UserSessions.update(
                                { status: UserSessionStatus.ACTIVE },
                                { where : { accessToken }}
                            );
                            req.body.user = decoded
                            next();
                        }
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