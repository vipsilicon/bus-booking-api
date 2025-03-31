import { Router } from 'express'; 
import ConfigRoutes from '../domain/config/config-routes';
import AuthRoutes from '../core/auth/auth-route'

const routerConfigs: [string, Router][] = [
    ['/config', ConfigRoutes ],
    ['/auth', AuthRoutes ],
];

export default routerConfigs;