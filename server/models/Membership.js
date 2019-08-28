const mongoose = require('mongoose')
const Schema = mongoose.Schema

const membershipSchema = new Schema({
    clubname: { type: Schema.ObjectId, ref: 'Bookclub' },

    name: { type: Schema.ObjectId, ref: 'User' }
 
}, { timestamps: true })

const Membership = mongoose.model('Membership', membershipSchema)
module.exports = Membership