import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { forEach } from 'lodash/fp';

import controllers from './controllers';
import router from './routes';
import { SERVER_PORT } from './config';
import { logger } from './utils';

const init = (controller) => {
  try {
    controller.init();
  } catch (e) {
    // console.warn(e);
  }
};

const server = new Koa();

server.use(bodyParser({ multipart: true }));
server.use(router.routes());

const run = async () => {
  logger.log('info', `Listening on port ${SERVER_PORT}`);

  forEach(init)(controllers);

  await server.listen(SERVER_PORT);
};

run();
