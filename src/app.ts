import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import routerConfigs from './routes/routeConfig';
import sequelize  from './config/databases';
import cors from 'cors';
import { config } from './config/config';

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
        this.databaseInit();
        this.initializeMiddleware();
        this.setupRoutes();
    }

    /**
     * Bootstrap the application
     * @static
     * @returns { Server }
     */
    public static bootstrap(): Server {
        return new Server();
    }

    private async databaseInit(){
        try{
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await sequelize.sync({ alter: false });
            console.log('All models were synchronized successfully.');
        } catch(error){
            console.error(`Unable to connect to database :: Error - ${error}`);
        }
    }
    private initializeMiddleware(){
        this.app.use(cors({
            origin: config.origin, // Allow frontend URL
            methods: config.methods,
            allowedHeaders: config.allowedHeaders
        }));
        //Built-in Express middleware for JSON and URL-encoded bodies
        this.app.use(express.json( { limit: '50mb'}));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use(express.raw({ type: 'text/html'}));
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