// class 类写法
var app = getApp();
var util = require("../../../../utils/utils.js");
class Movie {
    constructor(url) {
        this.url = url;
    }

    getMovieData(cb) {
        this.cb = cb;
        util.http(this.url, this.processDoubanData.bind(this));
    }

    processDoubanData(data) {
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

        console.log(movie);
        this.cb(movie);
    }
}

export {Movie};