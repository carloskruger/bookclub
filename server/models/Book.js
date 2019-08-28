const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    bookname: { type: Schema.ObjectId, ref: 'Meeting' },
    bookauthor: { type: Schema.ObjectId, ref: 'Meeting' },
    bookclub: { type: Schema.ObjectId, ref: 'Bookclub' },
    dateread: { type: Schema.ObjectId, ref: 'Meeting' },
    time: { type: Schema.ObjectId, ref: 'Meeting' }
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema)
module.exports = Book