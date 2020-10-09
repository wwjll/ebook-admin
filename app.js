const express = require('express')
const router = require('./router')
const fs = require('fs')        // https服务器
const https = require('https')  // 文件输入输出，用来导入证书
const bodyParser = require('body-parser')
const cors = require('cors')

// 创建 express 应用
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)

// https 服务
const privateKey = fs.readFileSync('book.epub_key.txt', 'utf8')
const certificate = fs.readFileSync('book.epub_ssl.crt', 'utf8')
const credentials = { key: privateKey, cert: certificate }
const httpsServer = https.createServer(credentials, app)
const SSLPORT = 18082
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})

