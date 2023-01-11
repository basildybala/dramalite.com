const { isValidObjectId } = require("mongoose")
const Actor = require("../models/Actor")
const Movie = require('../models/Movie')

exports.addCelebPage = async (req, res) => {
    try {
        let user = req.user
        res.render('celebs/add-celebs.ejs', { user })
    } catch (error) {
        console.log("err in add celeb page", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}

exports.addCeleb = async (req, res) => {
    try {
        let { actorname, language, age, yearactive, occupation, instalink, twitlink, biography } = req.body
        var profilePic;
        if (req.files.actorImages?.length > 0) {
            let path = "";
            req.files.actorImages.forEach(function (files, index, arr) {
                path = path + files.path + ",";
            });
            path = path.substring(0, path.lastIndexOf(","));
            var actorImages = path.split(",");
            profilePic = req.files.actorProfilePic[0].path
            let actor = await new Actor({
                actorname, language, age, yearactive, occupation, instalink, twitlink, biography,
                images: actorImages, profilePic
            })
            let saveActor= await actor.save()
            return res.redirect(`/celebs/${saveActor._id}`)
        } else {
            profilePic = req.files.actorProfilePic[0]?.path
            let actor = await new Actor({
                actorname, language, age, yearactive, occupation, instalink, twitlink, biography, profilePic
            })
            let saveActor= await actor.save()
            return res.redirect(`/celebs/${saveActor._id}`)
        }

    } catch (error) {
        console.log("err in add celeb page", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}

exports.editCelebrity = async (req, res) => {
    try {
        let celebId = req.params.celebId
        let { actorname, language, age, yearactive, occupation, instalink, twitlink, biography } = req.body
        var profilePic;
        console.log(req.body)
        if (req.files.actorImages?.length > 0) {
            let path = "";
            req.files.actorImages.forEach(function (files, index, arr) {
                path = path + files.path + ",";
            });
            path = path.substring(0, path.lastIndexOf(","));
            var actorImages = path.split(",");
            let actor = await Actor.findByIdAndUpdate(celebId, {
                actorname, language, age, yearactive, occupation, instalink, twitlink, biography,
            })
           await Actor.findByIdAndUpdate(
                celebId,
                {
                    $push:{
                        images:actorImages
                    }
                })
                return res.redirect(`/celebs/${actor._id}`)
        } else if (req.files.actorImages?.length > 0 && req.files.actorProfilePic?.length > 0) {
            let path = "";
            req.files.actorImages.forEach(function (files, index, arr) {
                path = path + files.path + ",";
            });
            path = path.substring(0, path.lastIndexOf(","));
            var actorImages = path.split(",");
            profilePic = req.files.actorProfilePic[0].path
            let actor = await Actor.findByIdAndUpdate(celebId, {
                actorname, language, age, yearactive, occupation, instalink, twitlink, biography,profilePic
            })
            await Actor.findByIdAndUpdate(
                celebId,
                {
                    $push:{
                        images:actorImages
                    }
                })
                return res.redirect(`/celebs/${actor._id}`)
        } else if (req.files.actorProfilePic?.length > 0) {
            profilePic = req.files.actorProfilePic[0]?.path
            let actor = await Actor.findByIdAndUpdate(celebId, {
                actorname, language, age, yearactive, occupation, instalink, twitlink, biography, profilePic
            })
            return res.redirect(`/celebs/${actor._id}`)
        } else {
            let actor = await Actor.findByIdAndUpdate(celebId, {
                actorname, language, age, yearactive, occupation, instalink, twitlink, biography, images: req.body.actorImages
            })
            return res.redirect(`/celebs/${actor._id}`)
        }
    } catch (error) {
        console.log("err in edit celeb page", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}
exports.editCelebrityPage = async (req, res) => {
    try {
        let user = req.user
        let celebId = req.params.celebId
        let celebrity = await Actor.findById(celebId)
        if (!celebrity) return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
        return res.render('celebs/edit-celebrity.ejs', { celebrity, user })
    } catch (error) {
        console.log("err in add celeb page", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}

exports.showAllCelebrityPage = async (req,res) => {
    try {
        let user=req.user
        let celebrity=await Actor.find()
        res.render('celebs/admin-show-all-celebrity',{celebrity,user})
    } catch (error) {
        console.log("err in show all celeb Page", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}


exports.deleteCelebrity = async (req,res) => {
    try {
        let celebId=req.params.celebId
        await Actor.findByIdAndDelete(celebId)

        res.redirect('/celebs/show-all-celebrity')
    } catch (error) {
        console.log("err in show all celeb Page", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}

exports.showOneCelebrity=async(req,res)=>{
    try {
        let user=req.user
        let celebId=req.params.celebId
        if (!isValidObjectId(celebId)) return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
        let celebrity=await Actor.findById(celebId)
        let moviesList=await this.getCelebrityMoviesList(celebId)
        // let celebrity ={...celebrityDettails,moviesList}
        res.render('celebs/show-one-celebrity',{user,celebrity,moviesList})
    } catch (error) {
        console.log("err in show all celeb Page", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}

exports.getOneCeleb = async (celebId) => {
    try {
        let celebrity = await Actor.findById(celebId)
        return celebrity
    } catch (error) {
        console.log("err in get one celeb function", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}


exports.getCelebrityMoviesList = async (celebId) => {
    try {
        let celebrityMovies = await Movie.aggregate([
            {$match:{$or:[{actid1:(celebId)},{actid2:(celebId)},{actid3:(celebId)},{actid4:(celebId)},{actid5:(celebId)},{actid6:(celebId)}]}},
            {$sort:{_id:-1}}
        ])
        return celebrityMovies
    } catch (error) {
        console.log("err in get one celeb function", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}

exports.allCelebrityImages=async(req,res)=>{
    try {
        let user=req.user
        let celebId=req.params.celebId
        let celebrity=await Actor.findById(celebId)
        res.render('celebs/all-images',{user,celebrity})
    } catch (error) {
        console.log("err in show all celeb Page", error)
        return res.render('utils/err-handle-page', { error: { msg: "something wrong pls inform to admin", link: '/contact' } })
    }
}