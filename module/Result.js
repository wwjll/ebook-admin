const {
    CODE_ERROR,
    CODE_SUCCESS,
    CODE_TOKEN_EXPIRED
  } = require('../utils/constant')
  
  class Result {
    constructor(data, msg = '操作成功', options) {
      this.data = data
      if (arguments.length === 0) {
          this.msg = '操作成功'
      } else if(arguments.length === 1) {
          this.msg = data
      } else {
          this.data = data
          this.msg = msg
          if (options) {
            this.options = options
        }
      }
    }
  
    createResult() {
      if (!this.code) {
        this.code = CODE_SUCCESS
      }
      let base = {
        code: this.code,
        data: this.data,
        msg: this.msg
      }
      if (this.options) {
        base = { ...base, ...this.options }
      }
      return base
    }
  
    json(res) {
      res.json(this.createResult())
    }
  
    success(res) {
      this.code = CODE_SUCCESS
      this.json(res)
    }
  
    fail(res) {
      this.code = CODE_ERROR
      this.json(res)
    }

    jwtError(res) {
      // token 异常信息
      this.code = CODE_TOKEN_EXPIRED
      this.json(res)
    }
  }
  
  module.exports = Result
  