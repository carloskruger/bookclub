const express = require('express');
const router = express.Router();

const Bookclub = require('../models/Bookclub')

router.get('/getAllBookclubs', (req, res) => {
    Bookclub.find()
        .then(allBookclubs => res.json(allBookclubs))
        .catch(err => console.log('Error', err))
})

router.get('/getOneBookclub/:id', (req, res) => {
    Bookclub.findById(req.params.id)
        .then(theBookclub => res.json(theBookclub))
        .catch(err => console.log('Error', err))
})

router.get('/getMyBookclub/:creatorid', (req, res) => {
    console.log('req.params.creatorid')
    Bookclub.find({creator_id: req.params.creatorid})
        .then(theBookclub => {
            console.log(theBookclub)
            res.json(theBookclub)})
        .catch(err => console.log('Error', err))
})


router.post('/postBookclub', (req, res) => {

    Bookclub.create(req.body)
        .then(theNewBookclub => res.json(theNewBookclub))
        .catch(err => console.log('Error', err))
})

router.post('/addClubMembers', (req, res) => {
    console.log(req.body.bookClubId, req.body.userId, req.body)

    // Bookclub.findById(req.body.bookClubId) 
    //     .then(theNewClub => {
    //         console.log(theNewClub)
    //         res.json(theNewClub)
    //     })
    //     .catch(err => console.log('Error', err))

    Bookclub.findByIdAndUpdate(req.body.bookClubId, {$push : {users: req.body.userId}}, {new: true}) 
        .then(theNewClub => {
            console.log(theNewClub, 'soy el then')
            res.json(theNewClub)
        })
        .catch(err => console.log('Yo soy el catch', err))
})

module.exports = router