const { env } = require('./env')
const BASE_PATH = 'D:\\fe\\resource\\upload'
// 操作系统中的绝对路径
const UPLOAD_PATH = env === 'dev' ? `${BASE_PATH}` : ''
const UPLOAD_URL = env === 'dev' ?
  'http://test.youbaobao.xyz:8089/admin-upload-ebook' :
  'https://book.youbaobao.xyz/admin-upload-ebook'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED: -2, 
  debug: false,  // 后台开启 debug 模式
  PWD_SALT: 'admin_imooc_node', // 用户密码加盐字符串
  CODE_TOKEN_EXPIRED: 1200,
  JWT_EXPIRED: 60 * 60, // token失效时间
  PRIVATE_KEY: 'book.epub', // jwt 私钥
  UPLOAD_PATH,
  UPLOAD_URL,
  MIME_TYPE_EPUB: 'application/epub+zip',
}