const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;


//connecting to mongodb
const url = "mongodb+srv://sabelo:sabelotest@cluster0-vqbas.mongodb.net/test?retryWrites=true";

MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("UserProfile");
  var myobj = {   
    name: 'sabelo2',
    surname: 'Thabethe2',
    age: '23',
    degree: 'CompSci',
    favouriteCourse: 'EEE'
    };

  dbo.collection("mycollection").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}); 


app.post('/create-user',  (req, res)=> {
  res.json({name:'Hello World'})
})
 
app.listen(3000)