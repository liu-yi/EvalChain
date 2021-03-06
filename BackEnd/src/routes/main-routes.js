import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter()

router
  .get('/public/:x', function (ctx, next) {
    ctx.body = {
      result: 'get',
      name: ctx.params.x,
      para: ctx.query
    }
  }) // 以/public开头则不用经过权限认证
  // .all('/upload', controllers.upload.default)
  .post('/public/login', controllers.public.Login)
  .post('/user/logout', controllers.public.Logout)
  .post('/public/signup', controllers.public.Signup)
  .get('/user/info', controllers.user.Get)
  .post('/api/evaluations', controllers.evaluation.Post)
  .get('/api/evaluations/', controllers.evaluation.Get)
  .get('/api/evaluations/:address', controllers.evaluation.Get)
  .post('/api/evaluations/:address', controllers.evaluation.Post)
  .get('/api/users/:id', controllers.user.Get)
  .get('/api/users', controllers.user.Get)
  // .get('/api/:name', controllers.api.Get)
  // .post('/api/:name', controllers.api.Post)
  // .put('/api/:name', controllers.api.Put)
  // .del('/api/:name', controllers.api.Delete)
  // .post('/auth/:action', controllers.auth.Post)
  // .get('/evaluations/:address', controllers.evaluation.Get)
  // .get('/evaluations', controllers.evaluation.GetAll)
  // .delete('/evaluations/:address', controllers.evaluation.Delete)
  // .post('/user', controllers.user.Post)
  // .delete('/user', controllers.user.Delete)

module.exports = router
