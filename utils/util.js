const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * Promise形式的getSetting
 */
const asyncGetSetting = ()=>{
 return new Promise((resolve,reject)=>{
  wx.getSetting({
    success (res) {
      resolve(res)
    },
    fail(error){
      reject(error)
    }
  })
  })
}
/**
 * Promise形式的chooseAddress
 */
const asyncChooseAddress = ()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success(option){
        resolve(option)
      },
      fail(res){
        reject(res)
      }
    })
  })
}
/**
 * Promise形式的openSetting
 */
const asyncOpenSetting = ()=>{
  return new Promise ((resolve, reject)=>{
    wx.openSetting({
      success (res) {
        resolve(res)
      },
      fail(res){
        reject(res)
      }
    })
  })
}
module.exports = {
  asyncGetSetting,
  asyncChooseAddress,
  asyncOpenSetting
}