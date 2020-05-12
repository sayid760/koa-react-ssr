//web 服务启动入口对象

// import reactSsr from './react-ssr';
const Koa = require('koa')
const app = new Koa()
const koaStatic  = require( 'koa-static')
const proxy = require('koa-proxy');
const path = require('path')
var fs = require('fs');

const port = 7001
// const port = proConfig.nodeServerPort || process.env.PORT;

const index = require('./routes')

//设置可访问的静态资源
//TODO:生产换需要删除此功能
app.use(koaStatic('./dist'));

// 透明转发 中间件
app.use(proxy({
    host: 'http://127.0.0.1:8000', // 本地开发的时候代理前端打包出来的资源地址
    match: /(\/static)|(\/sockjs-node)|(\/__webpack_dev_server__)|hot-update/
}));

app.use(index.routes(), index.allowedMethods())


//启动服务
app.listen(port, ()=>{
    console.log(`server is start http://localhost:${port}`)
});


