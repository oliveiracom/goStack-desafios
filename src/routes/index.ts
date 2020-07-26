import { Router } from 'express';
<<<<<<< HEAD

import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
=======
import transactionRouter from './transaction.routes';

const routes = Router();

routes.use('/transactions', transactionRouter);
>>>>>>> 110070b3af89db9a459809cf0e5f7658610300f6

export default routes;
