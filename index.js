const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')

const url = "mongodb+srv://sabelo:sabelotest@cluster0-vqbas.mongodb.net/test?retryWrites=true";


function insertToDatabase (myobj){
  MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("UserProfile");

    dbo.collection("mycollection").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  }); 
}

function updateUserInfo( userEmail, updateFieldObj){
  MongoClient.connect(url, {useNewUrlParser:true},function(err, db) {
    if (err) throw err;
    var dbo = db.db("UserProfile");
    var myquery = { 'email': userEmail };
    var newvalues = { $set: updateFieldObj };
    dbo.collection("mycollection").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  }); 
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

 //create a user profile
app.post('/create-user', (req, res)=> {
  const userObj = {
    'email': req.body.email,
    'name' : req.body.name, 
    'surname' : req.body.surname, 
    'age' : req.body.age, 
    'degree' : req.body.degree,
    'favouriteCourse' : req.body.favouriteCourse,
    'password': req.body.password 
  }
  insertToDatabase(userObj);
  
  res.send('succefully created '+ req.body.name + '\'s profile')
  
})

//update a users info
//select user by email
app.put('/update/:email', (req, res)=>{
  const updateFieldObj = {
    'name' : req.body.name, 
    'surname' : req.body.surname, 
    'age' : req.body.age, 
    'degree' : req.body.degree,
    'favouriteCourse' : req.body.favouriteCourse,
  }
  updateUserInfo(req.params.email, updateFieldObj)
  
  res.send('Succesfully upadated ' + req.params.email + ' info')
});
 
app.listen(3000)