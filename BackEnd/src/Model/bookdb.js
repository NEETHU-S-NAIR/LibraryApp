const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://neethuS115:sureshN115@cluster0.k7axd0h.mongodb.net/LibraryDB?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    bookName : String,
    bookAuthorname : String,
    bookReleasedate : String,
    bookPrice : Number,
    bookRate : Number,
    bookImageurl : String
});

var bookdata = mongoose.model('Books', NewProductSchema); //UserData is the model and NewBookData is the schema

module.exports = bookdata;