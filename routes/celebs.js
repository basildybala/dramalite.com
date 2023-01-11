const { addCelebPage, addCeleb, editCelebrityPage, editCelebrity, showAllCelebrityPage, deleteCelebrity,showOneCelebrity, allCelebrityImages } = require('../controller/celeb');
const { isUser, isAdmin ,isAuth} = require('../middlewares/auth');
const { uploadImage } = require('../middlewares/multer');

const router = require('express').Router()

//RENDER CELEB PAGE
router.get('/add-celebrity',isAuth,isAdmin,addCelebPage)


//ADD CELEBRITY
router.post('/add-celebrity',uploadImage.fields([{ name: "actorProfilePic", maxCount: 1 }, { name: "actorImages", maxCount: 20 }]),addCeleb)

//RENDER EDIT CELEBRITY PAGE
router.get('/edit-celebrity/:celebId',editCelebrityPage)


//EDIT CELEBRITY
router.post('/edit-celebrity/:celebId',uploadImage.fields([{ name: "actorProfilePic", maxCount: 1 }, { name: "actorImages", maxCount: 20 }]),editCelebrity)

//DELETE CELEBRITY
router.get('/delete-celebrity/:celebId',deleteCelebrity)

//SHOW ALL CELEBRITY
router.get('/show-all-celebrity',showAllCelebrityPage)

//GET ONE CELEBS
router.get('/:celebId',showOneCelebrity)

//ALL IMAGES
router.get('/all-images/:celebId',allCelebrityImages)














module.exports = router;