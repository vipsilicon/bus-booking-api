import { Router, Request, Response, NextFunction } from 'express';

let router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
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