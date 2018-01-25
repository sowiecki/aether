import Router from 'koa-router';

import applicationView from '../views/application';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = applicationView;
});

export default router;
