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
  .post('/public/signup', controllers.public.Signup)
  .post('/api/evaluations', controllers.evaluation.Post)
  .get('/api/evaluations/:address', controllers.evaluation.Get)
  // .get('/api/:name', controllers.api.Get)
  // .post('/api/:name', controllers.api.Post)
  // .put('/api/:name', controllers.api.Put)
  // .del('/api/:name', controllers.api.Delete)
  // .post('/auth/:action', controllers.auth.Post)
  // .get('/evaluations/:address', controllers.evaluation.Get)
  // .get('/evaluations', controllers.evaluation.GetAll)
  // .delete('/evaluations/:address', controllers.evaluation.Delete)
  .get('/user/:id', controllers.user.Get)
  // .post('/user', controllers.user.Post)
  // .delete('/user', controllers.user.Delete)

module.exports = router
