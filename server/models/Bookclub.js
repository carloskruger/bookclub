const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookclubSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    creator: { type: String, required: true },
    contact: {type: String, required: true },
    creator_id: {type: String, required: true},
    books: [{type: String, required: false}],
    meetingdates: [{type: String, required: false}],
    meetinglocations: [{type: String, required: false}],
   // membername: [{type: String, required: false}],
   // memberemail: [{type: String, required: false}]
    users:[{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

const Bookclub = mongoose.model('Bookclub', bookclubSchema)
module.exports = Bookclub

// findbyIdAndUpdate(id, {$push {membership: } })