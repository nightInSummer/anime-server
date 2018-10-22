import "reflect-metadata"
import { createConnection } from "typeorm"
import * as path from 'path'
import * as Koa from "koa"
import { Context } from "koa"
import * as Router from "koa-router"
import * as bodyParser from "koa-bodyparser"
import { configure, getLogger } from "log4js"
import * as koaStaticPlus from 'koa-static-plus'
import * as koaJwt from 'koa-jwt'
import {AppRoutes} from "./routes"
import * as cors from 'koa-cors'
import renderServer from './middleware/server-render'
import renderLogin from './middleware/login-render'
import * as uploader from 'koa2-file-upload'
import * as _ from 'lodash'

configure('configure.json')
const logger = getLogger()
const errLog = getLogger('err')


// 秘钥
const jwtSecret = 'jwtSecret'
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7

const curry = _.curry((a, b) => b(a))

const packingResult = (action) => async (ctx: Context) => {
  try{
    await action(ctx)
    ctx.body = {
      data: ctx.body,
      statusNo: 1,
      statusMsg: ''
    }
  } catch (e) {
    errLog.error(e)
    ctx.body = {
      data: ctx.body,
      statusNo: 0,
      statusMsg: '系统错误'
    }
  }
}

const options = {
  "url": '/api/uploadImage',
  "storeDir": 'category',
  "provider": "local",
  "mimetypes": ['image/png','image/bmp','image/jpeg','image/gif'], // 如果没有配置,将不进行类型检查 http://www.freeformatter.com/mime-types-list.html
  "folder": "static/images",
  "urlPath": "static/images"
}




// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection({
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "110120119",
  "database": "anime_server",
  "synchronize": true,
  "entities": [
    __dirname + "/models/*.js"
  ]
}).then(async connection => {

  // create koa app
  const app = new Koa()
  const router = new Router({
    prefix: '/api'
  })

  // register all application routes
  AppRoutes.forEach(route => router[route.method](route.path, curry(route.action)(packingResult)))

  app.use(cors())


  // power check
  app.use((ctx, next) => {
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.status = 401
        ctx.body = 'Protected resource, use Authorization header to get access\n'
      } else {
        throw err
      }
    })
  })

  // white list
  app.use(koaJwt({secret: jwtSecret}).unless({
    path:[/^\/api\/login/, /^\/login/, /^\/public/, /^\/page/, /^\/api\/uploadImage/]
  }))


  // run app
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(uploader(options))

  // static file replacement
  app.use(koaStaticPlus(path.join(__dirname, '../dist'), {
    pathPrefix: '/public'
  }))

  app.use(koaStaticPlus(path.join(__dirname, '../static'), {
    pathPrefix: '/static'
  }))

  // render login page
  app.use(async (ctx) => {
    if(ctx.url === '/login') {
      await renderLogin(ctx)
    } else {
      await renderServer(ctx)
    }

  })

  // // ssr middleware
  // app.use(renderServer)


  app.listen(8000)

  logger.info("Koa application is up and running on port 8000")

  }).catch(error => errLog.error("TypeORM connection error: ", error))
