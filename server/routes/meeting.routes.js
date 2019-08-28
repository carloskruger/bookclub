const express = require('express');
const router = express.Router();
const Bookclub = require('../models/Bookclub')
const Meeting = require('../models/Meeting')

router.get('/getAllMeetings', (req, res) => {
    Meeting.find()
        .then(allMeetings=> res.json(allMeetings))
        .catch(err => console.log('Error', err))
})

router.get('/getOneMeeting/:id', (req, res) => {
    Meeting.findById(req.params.id)
        .then(theMeeting => res.json(theMeeting))
        .catch(err => console.log('Error', err))
})

router.get('/getMeeting/:bookclub_id', (req, res) => {
    console.log('req.params.bookclubid')
    Meeting.find({creator_id: req.params.bookclub_id})
        .then(theMeeting => {
            // console.log(theMeeting)
            res.json(theMeeting)})
        .catch(err => console.log('Error', err))
})


router.post('/postMeeting', (req, res) => {
    console.log('entro en post meeting')
    Meeting.create(req.body)
        .then(theNewMeeting => res.json(theNewMeeting))
        .catch(err => console.log('Error', err))
})


router.post('/addMeetingtoClub',(req, res) => {
    console.log(req.body.bookclub_id, ': is location')
     Bookclub.findOneAndUpdate({creator_id: req.body.bookclub_id}, 
        {$push : {meetinglocations: req.body.location, books: req.body.book, meetingdates: req.body.date}},
         {new: true})
     .then(theNewClub => {
         console.log(theNewClub, 'a=objeto')
         res.json(theNewClub)
     })
     .catch(err => console.log('Error', err))
    

})



module.exports = router