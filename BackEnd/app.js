
const express = require('express');
const logindata = require('./src/Model/logindb');
const bookdata = require('./src/Model/bookdb');
const app = new express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
var bodyparser = require('body-parser');


app.use(cors());
app.use(bodyparser.json())

username="admin";
password="1234";

function verifyToken(req,res,next)
{
  if(!req.headers.authorization)
    {
      return res.status(401).send('Unauthorized request')
    }
  let token=req.headers.authorization.split('')[1]
  if(token=='null')
  {
    return res.status(401).send('Unauthorised request')
  }
  let payload=jwt.verify(token,'secretkey')
  console.log(payload)
  if(!payload)
  {
    return res.status(401).send('Unauthorized request')
  }
  req.userId=payload.subject
  next()
}


// for inserting user details during signup to database

app.post('/signup',function(req,res){

  console.log(req.body);

  var signup = {       
    uFname : req.body.login.uFname,
    uLname : req.body.login.uLname,
      uEmail : req.body.login.uEmail,
      uphone : req.body.login.uphone,
      upassword : req.body.login.upassword
  }       
var signup = new logindata(signup);
signup.save();
});


app.post('/login',(req, res) => {
  console.log('inside');
  let userData = req.body
    if(!username){
      res.status(401).send('Invalid Password')
    }else
      if( password !== userData.password){
        res.status(401).send('Invalid Password')
      }else{
        let payload={subject:username+password}
        let token=jwt.sign(payload,'secretkey')
        res.status(200).send({token})
    }
})

//to get the booklist from the database
app.get('/books',function(req,res){

  console.log('hi')

  bookdata.find()
      .then(function(books){
          res.send(books);
      });

});


// to insert book details to the database
app.post('/insert', verifyToken, function(req,res){

       console.log(req.body);

  var book = {       
        bookName : req.body.book.bookName,
        bookAuthorname : req.body.book.bookAuthorname,
        bookReleasedate : req.body.book.bookReleasedate,
        bookPrice : req.body.book.bookPrice,
        bookRate : req.body.book.bookRate,
        bookImageurl : req.body.book.bookImageurl,
    }       
    var book = new bookdata(book);
    book.save();

});


//to access the details of single book
app.get("/:id",(req, res)=>{
  const id = req.params.id;
  bookdata.findOne({_id:id})
      .then((book)=>{
          res.send(book);
       });
});


//to update the details of a book
app.put('/update',(req,res)=>{
  console.log(req.body)

  id=req.body._id
  bookName = req.body.bookName,
  bookAuthorname = req.body.bookAuthorname,
  bookReleasedate = req.body.bookReleasedate,
  bookPrice = req.body.bookPrice,
  bookRate = req.body.bookRate,
  bookImageurl = req.body.bookImageurl
  bookdata.findByIdAndUpdate({"_id":id},
                                {$set:{"bookName":bookName,
                                      "bookAuthorname" : bookAuthorname,
                                      "bookReleasedate" : bookReleasedate,
                                      "bookPrice" : bookPrice,
                                      "bookRate" : bookRate,
                                      "bookImageurl" : bookImageurl
                                }})
                                .then(function(){
                                  res.send();
                                })
});


// to delete a book
app.delete('/remove/:id',(req,res)=>{

      id = req.params.id;
     bookdata.findByIdAndDelete({"_id":id})
           .then(()=>{
                   console.log('success')
                   res.send();
         })
});



app.listen(3006,function(){
    console.log('listening to port 3006');
  });