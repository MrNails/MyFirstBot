const router = require('koa-router')();
const appRouter = require('./app_router');

router.use('/api/v1/', appRouter);

module.exports = router;
