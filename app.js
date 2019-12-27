//app.js
App({
  onLaunch: function (options) {

    try {
      if (options) {
        // console.log("onLaunch ")
        // console.log(options)
        if (options.referrerInfo) {
          var newEvents = options.referrerInfo.extraData
          // console.log("has extraData")
          // console.log(newEvents)
          var myEvents = wx.getStorageSync('myevents') || []
          // console.log(myEvents)
          for (var i = 0; i < newEvents.length; i++) {
            // console.log("checking #" + i + " " + newEvents[i].name + " exists.")
            var exists = false
            // console.log(newEvents[i])
            for (var j = 0; j < myEvents.length; j++) {
              // console.log(myEvents[j])
              if (newEvents[i]['id'] == myEvents[j]['id']) {
                exists = true
                // console.log(newEvents[i].name + ' exists.')
                break
              }
            }
            if (!exists) {
              myEvents.push(newEvents[i])
              // console.log("push new event " + newEvents[i].name)
            }
          }
          wx.setStorageSync('myevents', myEvents)
        }
      }
    } catch (ex) {
      console.log("ERROR OCURE")
      console.error(ex)
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    myEvents: null
  }
})