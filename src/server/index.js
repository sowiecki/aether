import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import actions from 'actions';
import { SERVER_PORT } from 'config';
import { logger } from 'utils';
import store from './config/store';
import router from './routes';

const server = new Koa();

server.use(bodyParser({ multipart: true }));
server.use(router.routes());

const run = async () => {
  logger.log('info', `Listening on port ${SERVER_PORT}`);

  try {
    actions.emitSocketInit(store);
  } catch (e) {
    logger.warn(e);
  }

  await server.listen(SERVER_PORT);
};

run();
