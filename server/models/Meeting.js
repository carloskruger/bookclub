const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema({
    clubname: { type: String, required: true },
    location: { type: String, required: true },
    book: { type: String, required: false },
    bookauthor: { type: String, required: false },
    date: { type: String, required: true },
    time: {type: String, required: true},
    bookclub_id: {type: String, required: true}
}, { timestamps: true })

const Meeting = mongoose.model('Meeting', meetingSchema)
module.exports = Meeting