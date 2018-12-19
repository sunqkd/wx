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

function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2); // 
}

function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

module.exports = {
    converToStarsArray: converToStarsArray,
    http: http,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
}