const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://neethuS115:sureshN115@cluster0.k7axd0h.mongodb.net/LibraryDB?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    uFname : String,
    uLname : String,
    uEmail : String,
    uPhone : Number,
    uPassword : String
});

var logindata = mongoose.model('Users', NewProductSchema); //UserData is the model and NewBookData is the schema

module.exports = logindata;