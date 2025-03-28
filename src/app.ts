import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import  routerConfigs from './routes/routeConfig';

/**
 * The Server
 * @class Server
 */

class Server {

    public app: Application;

    /**
     * Create express JS Application
     * @constructor
     */
    constructor(){
        this.app =  express();
        this.setupRoutes();
        this.initializeMiddleware();
    }

    /**
     * Bootstrap the application
     * @static
     * @returns { Server }
     */
    public static bootstrap(): Server {
        return new Server();
    }

    public initializeMiddleware(){
        //Built-in Express middleware for JSON and URL-encoded bodies
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.raw());
        this.app.use(cookieParser());
    }

    private setupRoutes(){
        routerConfigs.forEach(([path, router]) => {
            this.app.use(path, router);
        });
    }
}

const server  = Server.bootstrap();
export default server;