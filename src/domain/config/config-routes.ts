import { Router, Request, Response, NextFunction } from 'express';
import { userMiddleware } from '../../core/middleware/userMiddleware';

let router: Router = Router();

router.get('/', 
    userMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
    try{
        res.json({ 
            message: "Hello from Config Route",
            status: 200 
        });
    } catch(error){
        next(error);
    }

});

export default router;