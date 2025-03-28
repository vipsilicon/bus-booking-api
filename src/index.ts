import * as HTTP from 'http';
import server  from './app';
import { config } from './config/config';

async function start(){

    server.app.set('port', config.port);

    let httpServer = HTTP.createServer(server.app);
    httpServer.listen(config.port, () => {
        console.log(`Server running on port ${config.port} in ${config.NODE_ENV} mode`);
    });
}

start();