

const Router = require('koa-router')
const router = Router()

let text = ''
const defaultTime = 180
let lastTime = 0
let times = ''

function clearText() {
  clearTimeout(times)
  if (lastTime === 0) {
    text = ''
    return
  }
 
  times = setTimeout(() => {
    lastTime -= 1
    clearText()
  }, 1000)
}


// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
    return new Promise((resolve, reject) => {
      try {
        let postdata = "";
        ctx.req.addListener('data', (data) => {
          postdata += data
        })
        ctx.req.addListener("end",function(){
          resolve( JSON.parse(postdata) )
        })
      } catch ( err ) {
        reject(err)
      }
    })
}

router.get('/getSaveText', async ( ctx )=>{
    ctx.body = {
        success: true,
        data: text,
        lastTime: lastTime,
        totalTime: defaultTime
    }
})

router.post('/saveText', async ( ctx )=>{
    let postData = await parsePostData( ctx )
    // 保存数据    
    text = postData.text

    lastTime = text === '' ? 0 : defaultTime
    clearText()

    ctx.body = {
      success: true,
      msg: 'ok'
  }
})

module.exports = router