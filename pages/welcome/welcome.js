// pages/welcome/welcome.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 开启小程序点击事件
    onTap: function(event) {
        console.log("父组件");
        // 父子之间跳转 存在返回箭头 限制最多只有5级

        // wx.navigateTo({
        //     url: '/pages/posts/post',
        // })

        // 两个界面之间平行跳转 不存在返回箭头
        wx.redirectTo({
            url: '/pages/posts/post',
        })

        // redirectTo 完整写法
        // wx.redirectTo({
        //     url: '',
        //     success: function(res) {
        //         // 跳转成功
        //     },
        //     fail: function(res) {
        //         // 跳转失败
        //     },
        //     complete: function(res) {
        //         // 无论成功或者失败都会执行
        //     },
        // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log("onhide"); // navigateTo
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        console.log("onunload"); // redirectTo
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})