const Koa = require('koa')
const fs = require('fs')
// 导入koa2-cors模块
// const cors = require('koa2-cors')
const app = new Koa()
const { port } = require('./package.json')

//配置 cors 的中间件 , nginx 配置就可以
// app.use(async (ctx, next)=> {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Max-Age', 600);
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (ctx.method == 'OPTIONS') {
//     ctx.body = 200; 
//   } else {
//     await next();
//   }
// });
// app.use(
//   cors({
//       origin: async function (ctx, next) { //设置允许来自指定域名请求
//         return '*'; // 允许来自所有域名请求
//       },
//       maxAge: 5, //指定本次预检请求的有效期，单位为秒。
//       credentials: true, //是否允许发送Cookie
//       allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
//       // allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
//       // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
//   })
// )

const routers = require('./routers/index.js')

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
 

app.listen(port, () => {
  console.log(`[demo] route-use-middleware is starting at port ${port}`)
})