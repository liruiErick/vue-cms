export function validPhone(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}

export function validTelPhone(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入固定电话号码'))
  } else if (!telphone(value)) {
    callback(new Error('请输入0511-4405222类固定号码'))
  } else {
    callback()
  }
}

//验证码
export function validateImg (rule, value, callback) {
  if (!value) {
    callback(new Error('验证码不能为空'))
  } else if (!isvalidateImg(value)) {
    callback(new Error('请输入4位验证码'))
  } else {
    callback()
  }
}

//验证手机号
function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(str)
}
//座机验证
function telphone(str) {
  const reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
  return reg.test(str)
}
//图像验证码
function isvalidateImg(str) {
  const reg = /^([a-zA-Z0-9]{4})$/;
  return reg.test(str)
}
