
// 加载配置文件
const config = require( '../config.js' );

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function Ajax(data = '', fn, method = "get", header = {}){
  wx.request({
      url: config.API_HOST + data,
      method : method ? method : 'get',
      data: {},
      header: header ? header : {"Content-Type":"application/json"},
      success: function( res ) {
          fn( res );
      }
  });
}
module.exports = {
  Ajax: Ajax,
  formatTime: formatTime
}
