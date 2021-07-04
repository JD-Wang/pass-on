

const Router = require('koa-router')
const router = Router()
const fs = require('fs')
const path = require('path')

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

 

router.get('/getSaveText', async ( ctx )=>{
    ctx.body = {
        success: true,
        data: text,
        lastTime: lastTime,
        totalTime: defaultTime
    }
})

router.post('/saveText', async ( ctx )=>{
  let postData = {}
    try {
      postData = JSON.parse(ctx.request.body)
    } catch (error) {
      
    }
    
    // 保存数据    
    text = postData.text

    lastTime = text === '' ? 0 : defaultTime
    clearText()

    ctx.body = {
      success: true,
      msg: 'ok'
  }
})

// 删除文件
function clearFile (filePath) {
  setTimeout(() => {
    fs.unlink(filePath, err => {})
  }, 6  * 1000)
}

// 保存文件
router.post('/saveFile', async ( ctx )=>{
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  const filePath = `files/${file.name}`
  let fileBasePath = path.join(__dirname, `../page/${filePath}`)
  // 创建可写流
  const upStream = fs.createWriteStream(fileBasePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);

  clearFile(fileBasePath)

  return ctx.body = {
    name: file.name,
    url: filePath
  };
})

module.exports = router