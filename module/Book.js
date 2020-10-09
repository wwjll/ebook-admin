const {
    MIME_TYPE_EPUB,
    UPLOAD_URL,
    UPLOAD_PATH,
  } = require('../utils/constant')
const fs = require('fs')
const Epub = require('../utils/epub')

class Book {
    constructor(file, data) {
        if (file) {
            this.createBookFromFile(file)
        } else if (data) {
            this.createBookFromData(data)
        }
    }
    createBookFromFile(file) {
        const {
            destination: des, // 文件本地存储目录
            filename, // 文件名称
            mimetype = MIME_TYPE_EPUB // 文件资源类型
        } = file
        // 电子书文件后缀名
        const suffix = mimetype === MIME_TYPE_EPUB ? '.epub' : ''
        const oldBookPath = `${des}/${filename}`
        const bookPath = `${des}/${filename}${suffix}`
        // 电子书下载 URL
        const url = `${UPLOAD_URL}/book/${filename}${suffix}`
        // 电子书解压后的文件夹路径
        const unzipPath = `${UPLOAD_PATH}/unzip/${filename}`
        // 电子书解压后的文件夹 URL
        const unzipUrl = `${UPLOAD_URL}/unzip/${filename}`
        if (!fs.existsSync(unzipPath)) {
            fs.mkdirSync(unzipPath, { recursive: true }) // 创建电子书解压后的目录
        }
        if (fs.existsSync(oldBookPath) && !fs.existsSync(bookPath)) {
            fs.renameSync(oldBookPath, bookPath) // 重命名文件
        }
        this.fileName = filename // 文件名
        this.path = `/book/${filename}${suffix}` // epub文件路径
        this.filePath = this.path // epub文件路径
        this.url = url // epub文件url
        this.title = '' // 标题
        this.author = '' // 作者
        this.publisher = '' // 出版社
        this.contents = [] // 目录
        this.cover = '' // 封面图片URL
        this.category = -1 // 分类ID
        this.categoryText = '' // 分类名称
        this.language = '' // 语种
        this.unzipPath = `/unzip/${filename}` // 解压后的电子书目录
        this.unzipUrl = unzipUrl // 解压后的电子书链接
        this.originalName = file.originalname
    }
    createBookFromData(data) {

    }
    parse() {
        return new Promise((resolve, reject) => {
            const bookPath = `${UPLOAD_PATH}${this.path}1`   
            if (!this.path || !fs.existsSync(bookPath)) {
                reject(new Error('电子书路径不存在'))
            }
            const epub = new Epub(bookPath)
            epub.on('error', err => {
                reject(err)
            })    
        })
        
    }
}

module.exports = Book