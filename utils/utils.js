// 公共函数
function converToStarsArray(stars) {
    var num = stars.toString().substring(0, 1); // 取十位数
    var array = [];
    for (var i = 0; i < 5; i++) {
        if (i < num) {
            array.push(1);
        } else {
            array.push(0);
        }
    }
    return array;
}

function http(url, callback) {

    wx.request({
        url: url,
        header: {
            "content-type": "application/json"
        },
        method: 'GET',
        success: function(res) {
            callback(res.data);
        },
        fail: function(res) {
            console.log(res)
        },
        complete: function(res) {

        },
    })

    
}


module.exports = {
    converToStarsArray: converToStarsArray,
    http: http
}