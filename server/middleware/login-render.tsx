require.extensions['.scss'] = function cssModulesHook() {
  return {}
}

require.extensions['.css'] = function cssModulesHook() {
  return {}
}

import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import * as buildPath from '../../dist/manifest.json'


function pipe(from, to, options) {
  return new Promise((resolve, reject) => {
    from.pipe(to, options)
    from.on('error', reject)
    from.on('end', resolve)
  })
}

export default async function renderLogin(ctx): Promise<void> {
  if(ctx.url === '/login') {
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


    const htmlString = renderToNodeStream(
      <div></div>
    )

    await pipe(htmlString, ctx.res, {end: false})
    ctx.res.write(`</div><script src="/public/${buildPath['login.js']}"></script><script src="/public/${buildPath['commons.js']}"></script></body></html>`)
    ctx.res.end()
  }
}
