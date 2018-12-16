// 


App({

    // 全局变量
    globalData: {
        g_isPlayingMusic: null, // 音乐是不是正在被播放
        g_currentMusic: null, // 哪一个音乐被播放
        doubanBase:  "http://t.yushu.im" // 豆瓣路径
    },
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function() {
        // console.log("onlanch")
    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function(options) {
        // console.log("onshow")
    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function() {
        // console.log("onhide")
    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function(msg) {
        console.log("onerror")
    }
})