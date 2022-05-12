const query = require('../db/query')

const listComments = async(req, res) => {
    try {
        let comments = await query(`select m.SHOW_ID, m.SHOW_TITLE, c.USER_ID, c.COMMENTS,  c.SCORE, c.REVIEW_TIME, u.USER_NAME as user_name, u.USER_ID 
        from shows as m inner join reviews as c on m.SHOW_ID=c.SHOW_ID inner join users as u on u.USER_ID=c.USER_ID order by c.USER_ID
        `)
        res.json({
            status: 0,
            data: comments
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
}

const addCommentToMovie = async(req, res) => {
    try {
        let movie_id = req.params.id
        let { rate, content } = req.body
        await query(`insert into comments(rate, content, comment_time, movie_id, user_id) value(${rate}, '${content}', now(), ${movie_id}, ${req.user_id})`)
        res.json({
            status: 0
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
}

module.exports = {
    listComments,
    addCommentToMovie
}