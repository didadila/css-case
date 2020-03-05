// 配置编译环境和线上环境之间的切换

const env = process.env
let baseUrl = ''
// 图表库为avue和pig2套地址
const iconfontVersion = ['567566_qo5lxgtishg', '667895_v7uduh4zui']
const iconfontUrl = '//at.alicdn.com/t/font_$key.css'
if (env.NODE_ENV === 'development') {
  // baseUrl = "http://10.129.0.101:9990"
} else if (env.NODE_ENV === 'production') {
  // baseUrl = "http://10.129.0.101:9990"
} else if (env.NODE_ENV === 'test') {

}

const codeUrl = `${baseUrl ? baseUrl : window.location.origin}/code`
const actUrl = `${baseUrl ? baseUrl : window.location.origin}/act/modeler.html?modelId=`

export {
  baseUrl,
  actUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env
}
