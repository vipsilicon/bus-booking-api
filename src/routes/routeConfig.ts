import { Router } from 'express'; 
import ConfigRoutes from '../domain/config/config-routes';

const routerConfigs: [string, Router][] = [
    ['/config', ConfigRoutes ]
];

export default routerConfigs;