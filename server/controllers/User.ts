import { Context } from 'koa'
import * as jwt from 'jwt-simple'

// 秘钥
const jwtSecret = 'jwtSecret'
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7

export async function login(ctx: Context): Promise<void> {
  const user = ctx.request.body

  if (user.name === 'admin' && user.password === 'zuoying@2018'){
    let payload = {
      exp: Date.now() + tokenExpiresTime,
      name: user.name
    }

    let token = jwt.encode(payload, jwtSecret)

    const ucCookie = {
      user: user.name,
      token
    }
    ctx.cookies.set('u_c', JSON.stringify(ucCookie) as any, {
      domain: ctx.header.host.split(':')[0],
      path: '/',   //cookie写入的路径
      maxAge: 1000 * 60 * 60,
      expires: new Date(),
      httpOnly: false,
      overwrite: false
    })

    ctx.body = {
      user: user.name,
      code: 1,
      token
    }

  }else {
    ctx.body = {
      code: -1
    }
  }
}

export async function userInfo(ctx: Context): Promise<void> {
  let token = ctx.header.authorization

  ctx.body = {
    token:token,
    user:ctx.state.user
  }

  //使用jwt-simple自行解析数据
  let payload = jwt.decode(token.split(' ')[1], jwtSecret);
  console.log(payload)
}
