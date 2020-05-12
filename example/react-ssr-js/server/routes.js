const router = require('koa-router')()
const ssrConfig = require('../config/config.ssr')
const { renderToString } = require('react-dom/server')

ssrConfig.routes.map(route => {
  router.get(`${route.path}`, async (ctx, next) => {
    try {
      ctx.type = 'text/html'
      ctx.status = 200
      Object.assign(ctx.app, {"config": ssrConfig})
      const { useCDN, serverJs, baseDir, isRax, useReactToString } = ctx.app.config
      // 获取path对应的组件，渲染成html
      let SEVER_JS = serverJs
      const serverComponent = await require(SEVER_JS).default(ctx)
      const stream = renderToString(serverComponent)
      ctx.body ='<!DOCTYPE html>'+stream
  } catch (error) {
    console.log(`Page renderToString Error`, error)
  }

  }) 
})

router.get('/api/getIndexData', async (ctx, next) => {
  try {
    // Page为webpack打包的chunkName，项目默认的entry为Page
    ctx.type = 'text/json'
    ctx.status = 200
    ctx.body = {
      "news":[
        {
          id: '1',
          title: 'aaaaaaaaaaaaa'
        },
        {
          id: '2',
          title: 'bbbbbbbbbbbbb'
        },
        { id: '3',
          title: 'cccccccccccccc'
        },
        { id: '4',
          title: 'ddddddddd'
        },
        { id: '5',
          title: 'eeeeeeeeeeeeeeeee'
        }
      ]
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
