import express from 'express';
import routes from './routes';
import { registerComonInfrastructureService } from '../infrastructure/common/ServiceRegister';
import { registerAuthInfrastructureService } from '../infrastructure/auth/ServiceRegister';
import { registerRecipeDataInfrastructureService } from '../infrastructure/recipe-data/ServiceRegister';
import { DIContainer } from '../shared/dependency-injection/DIContainer';
import { registerCommonApplicationServices } from '../core/application/common/ServiceRegister';
import { registerAuthApplicationServices } from '../core/application/auth/ServiceRegister';
import { registerRecipeApplicationServices } from '../core/application/recipes/ServiceRegister';
import { responseParser } from './common/middlewares/responseParser.middleware';
import { DataBaseInit } from './extensions/Database.extension';
import { errorParser } from './common/middlewares/errorParser.middleware';
import { buildContainer } from './common/middlewares/buildContainer.middleware';
import { registerCommonApiServices } from './common/ServiceRegistration';

export const container = new DIContainer();

registerComonInfrastructureService(container);
registerAuthInfrastructureService(container);
registerRecipeDataInfrastructureService(container);
registerCommonApplicationServices(container);
registerAuthApplicationServices(container);
registerRecipeApplicationServices(container);
registerCommonApiServices(container);
DataBaseInit();

const app = express();
app.use(buildContainer(container));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use(responseParser);
app.use('/api', routes);
app.use(errorParser);

export default app;
