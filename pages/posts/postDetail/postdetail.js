var postsData = require("../../../data/postdata.js");
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        collected: false,
        id: null,
        isplayingMusic: false, // 音乐播放
        postData: null,
    },
    // 收藏按钮
    onCollection: function(event) {
        this.getPostCollectedsync();
    },


    getPostCollected: function() { // 异步做缓存的方法封装

        wx.getStorage({
            key: 'posts_Collected',
            success: (res) => {
                var postsCollected = res.data;
                var pcollect = postsCollected[this.data.id]; // 2、拿到本文章是否是收藏
                pcollect = !pcollect; // 取反

                postsCollected[this.data.id] = pcollect;
                wx.setStorageSync("posts_Collected", postsCollected); // 更新缓存

                this.setData({ // 更新数据绑定
                    collected: pcollect
                })


                wx.showToast({ // 默认为1500毫秒
                    title: pcollect ? '收藏成功' : '取消成功'
                })

            },
            fail: (res) => {

            },
            complete: (res) => {

            }
        })

    },

    getPostCollectedsync: function() { // 同步做缓存的方法封装
        var postsCollected = wx.getStorageSync("posts_Collected"); // 1、获取缓存
        var pcollect = postsCollected[this.data.id]; // 2、拿到本文章是否是收藏
        pcollect = !pcollect; // 取反

        postsCollected[this.data.id] = pcollect;
        wx.setStorageSync("posts_Collected", postsCollected); // 更新缓存

        this.setData({ // 更新数据绑定
            collected: pcollect
        })


        wx.showToast({ // 默认为1500毫秒
            title: pcollect ? '收藏成功' : '取消成功'
        })

        // wx.showModal({ // 模态框
        //     title: '收藏',
        //     content: '45646554',
        //     showCancel: true,
        //     cancelText: '取消收藏',
        //     cancelColor: '#333',
        //     confirmText: '收藏',
        //     confirmColor: '#405f80',
        //     success(res) {
        //         if (res.confirm) {
        //             console.log('用户点击确定')
        //         } else if (res.cancel) {
        //             console.log('用户点击取消')
        //         }
        //     }
        // })
    },

    // 分享按钮
    onShareTap: function(event) { // 分享键
        var itemList = [
            '分享给微信好友',
            '分享到朋友圈',
            '分享到QQ',
            '分享到微博'
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function(res) { // 点击其他按钮 从上到下从0开始

                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '暂不能分享',
                })
            },
            fail: function(res) { // 点击取消操作
                console.log(res)
            }
        })
    },

    // 音乐播放按钮

    onmusictap: function() {

        // var isplayingMusic = this.data.isplayingMusic;
        if (this.data.isplayingMusic) {

            wx.pauseBackgroundAudio(); // 暂停

            this.setData({
                isplayingMusic: false
            })

        } else {

            wx.playBackgroundAudio({
                dataUrl: postsData.postList[this.data.id].music.musicurl, // 音乐路径
                title: postsData.postList[this.data.id].music.title, // 音乐标题
                coverImgUrl: postsData.postList[this.data.id].music.coverImgUrl,
                success: function(res) {

                },
                fail: function(res) {

                },
                complete: function(res) {

                },
            });

            this.setData({
                isplayingMusic: true
            })

        }





    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { // 详情页面拿数据


        var globalData = app.globalData

        var id = options.id; // 拿到?后面的参数
        this.setData({ // 记录id
            id: id
        })
        var postdata = postsData.postList[id];
        this.setData({
            postData: postdata
        });
        var postsCollected = wx.getStorageSync("posts_Collected"); // 读缓存
        if (postsCollected) {
            var pcollected = postsCollected[id]; // 读取其中的某一个文章 是不是读取状态
            if (pcollected) {
                this.setData({ // 数据更新
                    collected: pcollected
                })
            } else {
                // console.log(pcollected);
                postsCollected[id] = false;
                wx.setStorageSync("posts_Collected", postsCollected);
                this.setData({ // 数据更新
                    collected: false
                })
            }
        } else { // 不存在则初始化
            var postsCollected_new = {};
            postsCollected_new[id] = false;
            wx.setStorageSync("posts_Collected", postsCollected_new);
        }


        // 初始化音乐播放
        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusic == this.data.id) { // true
            this.setData({
                isplayingMusic: true
            })
        } else {

        }

        this.setAudioMonitor(); // 兼听音乐

    },

    setAudioMonitor: function() {
        // 监听音乐启动
        wx.onBackgroundAudioPlay(() => {

            this.setData({
                isplayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusic = this.data.id;

        })
        // 监听音乐停止
        wx.onBackgroundAudioPause(() => {

                this.setData({
                    isplayingMusic: false
                })

                app.globalData.g_isPlayingMusic = false;
                app.globalData.g_currentMusic = null;

            }),
            // 监听音乐停止

            wx.onBackgroundAudioStop(() => {
                this.setData({
                    isplayingMusic: false
                })
                app.globalData.g_isPlayingMusic = false;
                app.globalData.g_currentMusic = null;
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        // console.log(this.postData)
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
        // console.log(132)
        // wx.clearStorageSync(); // 清除缓存
        // wx.stopBackgroundAudio(); // 停止播放音乐
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