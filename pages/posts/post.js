var postsData = require("../../data/postdata.js");
// 注：绝对路径会报错  只能用相对路径

// console.log(postsData.postList);

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onPostTap:function(event){
        // console.log(event.currentTarget.dataset)
        var postid = event.currentTarget.dataset.postid;
        // console.log(postid) 

        // 跳转到子界面

        wx.navigateTo({
            url: '/pages/posts/postDetail/postdetail?id=' + postid,
        })
    },
    /**
     * 生命周期函数--监听页面加载 1
     */
    onLoad: function(options) {

        this.setData({
            posts_key: postsData.postList
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成 3
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示 2
     */
    onShow: function() {
        // console.log(789)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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