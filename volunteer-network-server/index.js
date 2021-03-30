const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Object = require('mongodb').ObjectID
require('dotenv').config()

const port = process.env.PORT || 4200;

const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9cu5v.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello mama!')
});



client.connect(err => {
  const EventCollection = client.db(`${process.env.DB_DATABASE}`).collection(`${process.env.DB_COLLECTION}`);
  
  app.get('/events' , (req,res)=>{
    EventCollection.find()
    .toArray( (err,event)=>{
      res.send(event)
    })
  })

  app.post('/addImages' , (req, res)=>{
    const NewImageUrl = req.body;
    EventCollection.insertOne(NewImageUrl)
    .then(result =>{
      console.log('image added', result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })
  
  app.delete('/deleteEvent/:id' , (req,res)=>{
    const id = ObjectID(req.params.id)
    EventCollection.findOneAndDelete({_id: id})
    .then((err,document)=>{
      res.send(document.deleteCount > 0)
    })
  })
 

  // client.close();
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})