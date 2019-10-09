// pages/movies/more-movie/more-movie.js
var app = getApp(); // 引入app.js
var util = require("../../../utils/utils.js"); // 引入 utils中 http 方法

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigateTitle: '',
        movies: [],
        requestUrl: "",
        totalCount: 0,
        isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(category) {
        var category = category.category;

        this.setData({
            navigateTitle: category
        })

        wx.setNavigationBarTitle({ // 动态设置导航栏
            title: category,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })

        var dataUrl = "";
        switch (category) {
            case "正在热映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"
                break;
            case "即将上映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
                break;
            case "豆瓣top250":
                dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
                break;
        }
        this.setData({
            requestUrl: dataUrl
        });

        util.http(dataUrl, this.getData); // callback方法 获得结果  可以用promise方法 

    },
    getData: function(res) {
        // console.log(res);
        var movies = [];
        // console.log(res.subjects.length);
        for (var idx in res.subjects) {
            var subject = res.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + 　"...";
            }
            var temp = {
                stars: util.converToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieID: subject.id,
            };
            movies.push(temp);
        }

        // 加载更多
        var totalMovies = [];
        if (this.data.isEmpty) { // 是空的
            totalMovies = movies;
            this.setData({
                isEmpty: false
            })
        } else { // 不是空的
            totalMovies = this.data.movies.concat(movies);
        }

        this.data.totalCount += res.subjects.length + 1;

        this.setData({
            movies: totalMovies
        })
        wx.hideNavigationBarLoading();// 关闭导航等待
        wx.stopPullDownRefresh(); // 停止下拉刷新
    },
    onMovieTap: function (event) { // 跳转到详情页
        var movieid = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieid,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
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
    onPullDownRefresh: function() { // 下拉刷新
        // 初始化 
        this.data.totalCount = 0;
        this.data.isEmpty = true;
        this.data.movies = [];
        
        var refreshUrl = this.data.requestUrl;
        util.http(refreshUrl, this.getData);
        wx.showNavigationBarLoading();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=10";
        util.http(nextUrl, this.getData);
        // 设置导航等待
        wx.showNavigationBarLoading();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})