// pages/movies/movie-detail/movie-detail.js
var app = getApp();
var util = require("../../../utils/utils.js");
import {
    Movie
} from './class/Movie.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie: {} // 初始化数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var movieid = options.id ? options.id : 305;
        var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieid;
        console.log(url);
        util.http(url, this.processDoubanData);

        // var movie = new Movie(url);
        // movie.getMovieData((movie) => {
        //     this.setData({
        //         movie: movie
        //     })
        // });
    },

    processDoubanData: function(data) {
        console.log(data);
        var director = { // 导演
            avatar: "",
            name: "",
            id: ""
        };
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large
            }
            director.name = data.directors[0].name;
            director.id = data.id;
        }

        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            original_title: data.original_title,
            wish_count: data.wish_count,
            comments_count: data.comments_count,
            year: data.year,
            genres: data.genres.join("、"),
            stars: util.converToStarsArray(data.rating.stars),
            score: data.rating.average,
            directors: director,
            summary: data.summary,
            casts: util.convertToCastString(data.casts),
            castsInfo: util.convertToCastInfos(data.casts)
        }

        this.setData({
            movie: movie
        })

        console.log(movie);
    },

    viewMoviePostImg: function(e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({ // 预览图片
            current: src, // 当前显示图片的http链接
            urls: [src], // 需要预览的图片http链接列表
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
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