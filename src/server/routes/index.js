import Router from 'koa-router';

import genApplicationView from '../views/application';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = genApplicationView(ctx);
});

export default router;
