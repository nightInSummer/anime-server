require.extensions['.scss'] = function cssModulesHook() {
  return {}
}

import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import Routers from '../../app/pages/home/routers'
import * as buildPath from '../../dist/manifest.json'
import Store from "../../app/pages/home/store"
import Sidebar from '../../app/layouts/sidebar'


const store = new Store()

function pipe(from, to, options) {
  return new Promise((resolve, reject) => {
    from.pipe(to, options)
    from.on('error', reject)
    from.on('end', resolve)
  })
}

export default async function renderServer(ctx): Promise<void> {
  ctx.status = 200
  ctx.res.write(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="author" content="你的大名">
          <link rel="stylesheet" type="text/css" href="/public/${buildPath['commons.css']}">
        </head>
      <body>
    <div id="root">
  `)

  const htmlString =  renderToNodeStream(
    <Provider store={ store }>
      <div className='console'>
        <Sidebar />
        <div className='console-body'>
          <StaticRouter
            location={ctx.url}
            context={{}}
          >
            <Routers />
          </StaticRouter>
        </div>
      </div>
    </Provider>
  )
  await pipe(htmlString, ctx.res, {end: false})
  ctx.res.write(`</div><script src="/${buildPath['home.js']}"></script><script src="/${buildPath['commons.js']}"></script></body></html>`)
  ctx.res.end()

}
