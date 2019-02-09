const verification = {
    notEmpty: (rule, value, callback) => {
      if (!value) {
        return callback(new Error('选项不能为空！！'))
      } else {
        callback()
      }
    }
  }
  const verify = { ...verification }
  export default verify
  
  var Reg = {
    regPhone: /^1[34578][0-9]\d{8}$/,
    regBack: /\d{15}|\d{19}/
  }
  