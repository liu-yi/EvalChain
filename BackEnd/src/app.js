import Koa2 from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import {
  System as SystemConfig,
  MongoDB as MongoDBConfig
} from './config'
import path from 'path'
import MainRoutes from './routes/main-routes'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoutes from './routes/error-routes'
import jwt from 'koa-jwt'
import fs from 'fs'
import mongoose from 'mongoose'
// import PluginLoader from './lib/PluginLoader'

mongoose.connect(MongoDBConfig.url, (err) => {
  if (err) {
    console.log('fail to connect DB')
  } else {
    console.log('connect DB successfully')
  }
})

const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))

app
  .use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
      ctx.set('Access-Control-Allow-Origin', 'http://' + SystemConfig.HTTP_server_host + ':' + SystemConfig.HTTP_server_port)
    } else {
      ctx.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
  })
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/assets|\/api\/evaluations/] }))
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(MainRoutes.routes())
  .use(MainRoutes.allowedMethods())
  .use(ErrorRoutes())

if (env === 'development') { // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

app.listen(SystemConfig.API_server_port)

console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')

export default app
