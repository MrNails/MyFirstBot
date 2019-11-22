const router = require('koa-router')();

async function appRouter(ctx) {
  ctx.body = { greeting: 'Hello world' };
}

router.get('/', appRouter);

module.exports = router.routes();
