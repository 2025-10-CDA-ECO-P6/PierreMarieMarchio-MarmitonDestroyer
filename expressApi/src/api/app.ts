import express from 'express';
import routes from './routes';
import { registerComonInfrastructureService } from '../infrastructure/common/ServiceRegister';
import { registerAuthInfrastructureService } from '../infrastructure/auth/ServiceRegister';
import { registerRecipeDataInfrastructureService } from '../infrastructure/recipe-data/ServiceRegister';
import { DIContainer } from '../shared/dependency-injection/DIContainer';
import { registerCommonApplicationServices } from '../core/application/common/ServiceRegister';
import { registerAuthApplicationServices } from '../core/application/features/auth/ServiceRegister';
import { registerRecipeApplicationServices } from '../core/application/features/recipes/ServiceRegister';
import { AppDbContext } from '../infrastructure/common/persistence/contexts/AppDbContext';
import { RecipeDbContext } from '../infrastructure/recipe-data/persistence/contexts/RecipeDbContext';
import { responseMiddleware } from './middlewares/response.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

export const container = new DIContainer();

registerComonInfrastructureService(container);
registerAuthInfrastructureService(container);
registerRecipeDataInfrastructureService(container);
registerCommonApplicationServices(container);
registerAuthApplicationServices(container);
registerRecipeApplicationServices(container);

const DBInit = async () => {
  const appDbContext = container.inject<AppDbContext>('AppDbContext');
  const RecipeDbContext = container.inject<RecipeDbContext>('RecipeDbContext');
  await appDbContext.migrateAsync();
};

DBInit();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(responseMiddleware);
app.use('/api', routes);
app.use(errorMiddleware);

export default app;
