const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://organicUser:9ypJWrP5bpvGHZD@cluster0.ltrdg.mongodb.net/organicdb?retryWrites=true&w=majority";


const password = '9ypJWrP5bpvGHZD';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");
  // perform actions on the collection object
    app.post("/addProduct", (req, res) => {
        const product = req.body;
        productCollection.insertOne(product)
        .then(result => {
            console.log('data added successfully');
            res.send('success');
        })
    })
    

  console.log('database connected');

});


app.listen(3000);