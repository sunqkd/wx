var app = getApp(); // 引入app.js
var utils = require('../../utils/utils.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult: {},
        containerShow: true,
        searchPannelShow: false,
        inputText: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 正在热映
        var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
        // 即将上映 
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
        // 豆瓣top250
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

        // 异步操作
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "豆瓣top250");
    },

    getMovieListData: function(url, settedKey, catetoryTitle) {
        var that = this;
        // 发请求
        wx.request({
            url: url,
            header: {
                "content-type": "application/json"
            },
            method: 'GET',
            success: function(res) {
                // console.log(res);
                that.processDouBanData(res.data, settedKey, catetoryTitle);
            },
            fail: function(res) {
                // console.log("fail");
            },
            complete: function(res) {
                // console.log("完成");
            },
        })
    },
    processDouBanData: function(movieDouBan, settedKey, catetoryTitle) { // 数据处理函数

        var movies = [];
        for (var idx in movieDouBan.subjects) {
            var subject = movieDouBan.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                stars: utils.converToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieID: subject.id,
            };
            movies.push(temp);
        }

        var readyData = {};
        readyData[settedKey] = {
            catetoryTitle: catetoryTitle,
            movies: movies
        };
        this.setData(readyData); // 更新操作
        // console.log(this.data);
    },
    onMoreTap: function(event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: './more-movie/more-movie?category=' + category,
            success: function(res) {

            },
            fail: function(res) {

            },
            complete: function(res) {

            },
        })
    },

    onBindFocus: function() { // 聚焦
        this.setData({
            containerShow: false,
            searchPannelShow: true
        })
    },
    onBindInput: function(event) { // 获取输入值

    },
    onBindBlur: function(event) { // 失去焦点
        var text = event.detail.value;
        this.setData({
            inputText: text
        });
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
        this.getMovieListData(searchUrl, "searchResult", "");
    },
    onCancelImgTap: function() { // 取消方法
        this.setData({
            containerShow: true,
            searchPannelShow: false,
            searchResult: {},
            inputText: ''
        })
    },
    onBindConfirm: function(event) { // 回车事件
        var text = event.detail.value;
        this.setData({
            inputText: text
        });
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
        this.getMovieListData(searchUrl, "searchResult", "");
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