const express = require('express')
const multer = require('multer')
const auth = require('../services/auth')
const user = require('../services/user')
const movie = require('../services/movie')
const actor = require('../services/actor')
const comment = require('../services/comment')

const router = express.Router()
const upload = multer({ dest: './public/images' })

router.post('/login', auth.login)
router.post('/register', auth.register)

//router.use(auth.auth)


router.get('/user/', user.getALLUser)

router.get('/user/info/:id', user.getUserInfo)
router.get('/user/me/info', user.getMeInfo)
router.post('/user/me/change-avatar', upload.single('avatar'), user.changeMeAvatar)
router.put('/user/me/change-name', user.changeMeName)
router.put('/user/me/change-password', user.changeMePassword)

router.get('/show/list', movie.listMovies)
router.get('/show/:id', movie.getMovieDetail)

router.get('/actor/list', actor.listActors)
router.get('/actor/:id', actor.getActorDetail)

router.get('/review/list', comment.listComments)
//router.post('/comment/add-to-movie/:id', comment.addCommentToMovie)
router.get('/history/list', user.listHistories)
router.get('/genre/list', user.listGenre)
router.get('/director/list', user.listDirector)
router.get('/favorite/list', user.listFavorite)
router.get('/director/:id', user.getDirectorInfo)
router.get('/genre/:id', user.getGenre)







module.exports = router