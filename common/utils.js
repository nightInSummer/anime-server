const lodash = require('lodash')
const path = require('path')
const LRU = require('lru-cache')

// init lru-cache

const options = {
  max: 500,
  length: function (n, key) { return n * 2 + key.length },
  dispose: function (key, n) {
    console.log(key, "Disposed!!!")
  },
  maxAge: 1000 * 60 * 60
}

const cache = LRU(options)



const _ = module.exports = () => {}

// 将lodash内部方法的引用挂载到utils上，方便使用
lodash.assign(_, lodash)

_.getEntity = (views) => _.mapValues(views, (o) => `${path.resolve()}/app/pages/${o.key}/index.js`)

_.getQueryVariable = (variable) => {
  let query = typeof(window) === 'undefined' ? '' : window.location.search.substring(1)
  let vars = query.split("&")
  for (let i=0; i<vars.length; i++) {
    let pair = vars[i].split("=")
    if(pair[0] === variable){
      return pair[1]
    }
  }
  return ''
}

_.gePathname = () => {
  let pathname = typeof(window) === 'undefined' ? '' : window.location.pathname
  return pathname.replace('/', '')
}

_.translateTreeByPid = (arr) => {
  let res = { map: {}, tree: {} }
  res.map[0] = res.tree
  for(let node of arr ){
    res.map[node.id] = node;
    (res.map[node.pid].children || (res.map[node.pid].children = [])).push(node)
  }
  return res.tree.children || []
}

_.getImgSize = (imgSrc) => {
  return new Promise((resolve, reject) => {
    const newImg = new Image()
    newImg.onload = () => {
      const height = newImg.height
      const width = newImg.width
      resolve({ width, height })
    }
    newImg.onerror = () => {
      reject(new Error(`load image error: [${imgSrc}], please check image is exist!`))
    }
    newImg.src = imgSrc
  })
}

_.cache = cache
