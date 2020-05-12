# koa + react + ssr 脚手架

# 功能
- [x] 基于cra脚手架开发
- [x] 使用koa作为nodejs框架，可以替换成其他框架
- [x] 支持react路由
- [x] 支持本地开发环境（热更替）及线上环境
- [x] 统一前端路由与服务端路由
- [x] 支持tree shaking，优化构建bundle大小以及数量
- [x] 支持csr/ssr自定义layout，无需通过path来手动区分

```
// 开发场景
npm run dev

// 打包
npm run build   # 打包服务端以及客户端资源文件

npm run prod    # 打包完服务端及客户端文件后，启动服务器
npm run analyze # 可视化分析客户端打包的资源详情
```

# 思路
1、本地开发环境怎么做热更替？
client端：webpack自带的devServer（底层还是webpack-dev-server）可以监听页面修改，并且打包出内存文件bundle.js
server端：webpack.config.server.js本身打包出的只是本页面的css、js，不涉及交互的js，所以必须把bundle.js插入到html内，且通过nodejs去访问devServer监听变化打包出bundle.js
1）事先把bundle.js等遍历插入组件中，通过renderToString(component)渲染成html显示到页面
2）nodejs去访问devServer监听变化打包出内存文件
```
<div dangerouslySetInnerHTML={{
   __html: injectScript && injectScript.join('')
}} />
```

2、devServer监听修改后打包后的文件都存在内存中，http://localhost:8000/static/js/Page.chunk.js可以这样访问，那开发环境的nodejs如何访问内存文件？
用代理中间做转化，只要访问8000端口的，就代理到服务器端口7001，这样就可以访问到监听后打包的内存文件
```
// 透明转发 中间件
app.use(proxy({
    host: 'http://127.0.0.1:8000', // webpack-dev-server打包出来的内存文件
    match: /(\/static)|(\/sockjs-node)|(\/__webpack_dev_server__)|hot-update/
}))
```

