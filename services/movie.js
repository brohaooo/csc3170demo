const query = require('../db/query')

const listMovies = async(req, res) => {
    try {
        let limit = req.query.perPage
        let offset = (req.query.page - 1) * req.query.perPage
        let items = await query(`select * from shows order by SHOW_ID limit ${limit} offset ${offset}`)
        let total = await query(`select count(*) from shows`)
        total = total[0]['count(*)']
        res.json({
            status: 0,
            data: {
                items,
                total
            }
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
}

const getMovieDetail = async(req, res) => {
    try {
        let movie_id = req.params.id
        let [ movie ] = await query(`select * from shows where SHOW_ID =${movie_id}`)
        movie.actors = await query(`select * from actors as a inner join show_act as b on  a.ACTOR_ID=b.ACTOR_ID where b.SHOW_ID = ${movie_id}`)
        movie.directors = await query(`select * from directors as d inner join show_dir as b on  d.DIR_ID=b.DIR_ID where b.SHOW_ID = ${movie_id}`)
        movie.comments = await query(`select u.USER_ID, u.USER_NAME, c.SHOW_ID, c.SCORE, c.REVIEW_TIME, c.COMMENTS from reviews as c inner join users as u
        on c.USER_ID=u.USER_ID where c.SHOW_ID= ${movie_id}`)
        movie.genres = await query(`select * from genres as g inner join show_genre as s on g.GENRE_ID = s.GENRE_ID where s.SHOW_ID = ${movie_id}`)
        res.json({
            status: 0,
            data: movie
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1
        })
    }
}

module.exports = {
    listMovies,
    getMovieDetail
}