const fs = require('fs')
const query = require('../db/query')


const getALLUser = async(req, res) => {
    try {
        let limit = req.query.perPage
        let offset = (req.query.page - 1) * req.query.perPage
        let items = await query(`select * from users order by USER_ID limit ${limit} offset ${offset}`)
        let total = await query(`select count(*) from users`)
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


const userInfo = async(user_id) => {
    let [ user ] = await query(`select * from users where USER_ID=${user_id}`)
    user.comments = await query(`select m.SHOW_ID, m.SHOW_TITLE, m.SHOW_TYPE, c.REVIEW_TIME, c.SCORE, c.COMMENTS 
    from shows m inner join reviews c on m.SHOW_ID=c.SHOW_ID where c.USER_ID=${user_id}`)
    user.histories = await query(`select * from histories as h inner join shows as s on h.show_id = s.show_id where h.USER_ID=${user_id} order by h.END_TIME`)
    user.favorites = await query(`select * from favorites as f inner join shows as s on s.SHOW_ID = f.SHOW_ID where f.USER_ID=${user_id}`)
    user.pref_genre = await query(`select * from pref_genre as p inner join genres as g on p.GENRE_ID = g.GENRE_ID where p.USER_ID=${user_id}`)
    user.pref_actor = await query(`select * from pref_actor as p inner join actors as a on p.ACTOR_ID = a.ACTOR_ID where p.USER_ID=${user_id}`)

    return user
}

const getUserInfo = async(req, res) => {
    try {
        let user_id = req.params.id
        let user = await userInfo(user_id)
        res.json({
            status: 0,
            data: user
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
            msg: e
        })
    }
}

const getMeInfo = async(req, res) => {
    try {
        let user = await userInfo(req.user_id)
        res.json({
            status: 0,
            data: user
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
            msg: e
        })
    }
}

const changeMeAvatar = async(req, res) => {
    try {
        let [ { avatar_url } ] = await query(`select avatar_url from users where id=${req.user_id}`)
        await query(`update users set avatar_url='images/${req.file.filename}' where id=${req.user_id}`)
        fs.rmSync(`../public/${avatar_url}`, { force: true })
        res.json({
            status: 0
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
            msg: e
        })
    }
}

const changeMeName = async(req, res) => {
    try {
        let { new_name } = req.body
        let user = await query(`select * from users where name='${new_name}'`)
        if (user.length >= 1) {
            throw 'user name already exists'
        }
        await query(`update users set name='${new_name}' where id=${req.user_id}`)
        res.json({
            status: 0,
            msg: 'name changed successfully'
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
            msg: e
        })
    }
}

const changeMePassword = async(req, res) => {
    try {
        let { old_password, new_password } = req.body
        let [ { password } ] = await query(`select password from users where id='${req.user_id}'`)
        if (password !== old_password) {
            throw 'wrong old password'
        }
        await query(`update users set password='${new_password}' where id=${req.user_id}`)
        res.json({
            status: 0,
            msg: 'password changed successfully'
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
            msg: e
        })
    }
}

//直接在这里加后续api函数了，我懒得建新js了
const listHistories = async(req, res) => {
    try {
        let limit = req.query.perPage
        let offset = (req.query.page - 1) * req.query.perPage
        let items = await query(`select * from histories as h inner join users as u on u.user_id = h.user_id order by h.USER_ID limit ${limit} offset ${offset}`)
        let total = await query(`select count(*) from histories`)
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

const listGenre = async(req, res) => {
    try {
        let limit = req.query.perPage
        let offset = (req.query.page - 1) * req.query.perPage
        let items = await query(`select * from genres order by GENRE_ID limit ${limit} offset ${offset}`)
        let total = await query(`select count(*) from genres`)
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

const listDirector = async(req, res) => {
    try {
        let limit = req.query.perPage
        let offset = (req.query.page - 1) * req.query.perPage
        let items = await query(`select * from directors order by DIR_ID limit ${limit} offset ${offset}`)
        let total = await query(`select count(*) from directors`)
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

const listFavorite = async(req, res) => {
    try {
        let limit = req.query.perPage
        let offset = (req.query.page - 1) * req.query.perPage
        let items = await query(`select * from favorites as f inner join users as u  on u.user_id = f.user_id inner join shows as s on s.SHOW_ID = f.SHOW_ID order by f.USER_ID limit ${limit} offset ${offset}`)
        let total = await query(`select count(*) from favorites`)
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


const getDirectorInfo = async(req, res) => {
    try {
        let director_id = req.params.id
        //let user = await userInfo(director_id)
        let [ director ] = await query(`select * from directors where DIR_ID=${director_id}`)
        // user.comments = await query(`select m.SHOW_ID, m.SHOW_TITLE, m.SHOW_TYPE, c.REVIEW_TIME, c.SCORE, c.COMMENTS 
        // from shows m inner join reviews c on m.SHOW_ID=c.SHOW_ID where c.USER_ID=${user_id}`)
        director.movies = await query(`select m.SHOW_ID, m.SHOW_TITLE, m.SHOW_TYPE, c.DIR_ID from shows as m inner join show_dir as c on m.SHOW_ID=c.SHOW_ID where c.dir_id=${director_id}`)
        res.json({
            status: 0,
            data: director
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
}


const getGenre = async(req, res) => {
    try {
        
        let genre_id = req.params.id
        let [ genre ] = await query(`select * from genres where GENRE_ID=${genre_id}`)
        
        genre.movies = await query(`select * from shows as m inner join show_genre as g on m.SHOW_ID=g.SHOW_ID where g.GENRE_ID=${genre_id}`)
        res.json({
            status: 0,
            data: genre
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
}







module.exports = {
    getALLUser,
    getUserInfo,
    getMeInfo,
    changeMeAvatar,
    changeMeName,
    changeMePassword,
    listHistories,
    listGenre,
    listDirector,
    listFavorite,
    getDirectorInfo,
    getGenre
}