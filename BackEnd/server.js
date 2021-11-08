const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//database link
connectionStr = "mongodb+srv://admin:admin@cluster0.hykwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

//async connection method
async function main() {
  await mongoose.connect(connectionStr);
}

//schema for database
const movieSchema = new mongoose.Schema({
Title: String,
Year: String,
Poster: String
});

const movieModel = mongoose.model('movie', movieSchema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//create method
app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);

    movieModel.create({
        Title: req.body.Title,
        Year: req.body.Year,
        Poster: req.body.Poster
    })
    res.send('Data Sent to Server!')
})

//find method
app.get('/api/movies:id',(req, res) =>{
    console.log(req.params.id);

    movieModel.findById(req.params.id,(err, data) =>{
        res.json(data);
    })
})




app.get('/api/movies', (req, res) => {
    const movies = []
        
        
           // "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
       
            //"Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
       
   movieModel.find((err, data) =>{
        res.json(data);
   })
            
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})