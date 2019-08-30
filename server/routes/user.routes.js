const express = require('express');
const router = express.Router();
const User = require('../models/User')


router.get('/getAllUsers', (req, res) => {
    User.find()
        .then(allUsers=> res.json(allUsers))
        .catch(err => console.log('Error', err))
})

router.get('/getOneUser/:id', (req, res) => {
    User.findById(req.params.id)
        .then(theUser => res.json(theUser))
        .catch(err => console.log('Error', err))
})







module.exports = router