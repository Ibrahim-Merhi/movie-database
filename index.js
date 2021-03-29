const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { username, pass, myCluster } = require('./config');
// const Movies= require('../models/movies');

const url = 'mongodb+srv://rida:<password>@cluster0-vq5yo.mongodb.net/test?retryWrites=true&w=majority'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(url)
var app = express()

const moviesSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: Number
    });

const Movies = mongoose.model("Movies", moviesSchema);


app.get('/', (req, res) => {
    res.send('ok')
});

app.get('/test', (req, res) => {
    res.send({status:200, message:"ok"})
});

app.get('/time', (req, res) => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getSeconds();
    res.send({status:200, message:time})
});

app.get('/hello/:ID', (req, res) => {
    res.send({status:200, message:`hello ${req.params.ID}`})
    });
app.get('/search',(req,res) => {
        if(req.query.s !== "")
        { 
            res.send({status:200, message:"ok", data:req.query.s}) 
        } 
        else {
            res.send({status:500, error:true, message:"you have to provide a search"}) 
        } })    
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
app.get('/movies/read/',(req,res) => {
    res.send({status:200, data:movies})
})
app.get('/movies/read/by-date',(req,res) => {
    byYear = movies.sort(function(a,b) {
        return a.year - b.year
    })
    
    res.send({status:200, data:byYear})
})
app.get('/movies/read/by-rating',(req,res) => {
    byYear = movies.sort(function(a,b) {
        return a.rating - b.rating
    })
    
    res.send({status:200, data:byYear})
})
app.get('/movies/read/by-title',(req,res) => {
    function compare( a, b ) {
        if ( a.title < b.title ){
          return -1;
        }
        if ( a.last_nom > b.last_nom ){
          return 1;
        }
        return 0;
      }
    
    res.send({status:200, data:movies.sort(compare)})
})
app.get('/movies/read/id/:ID',(req,res) => {
    var e = req.params.ID
    if(e <= movies.length && e >= 1)
    { 
        res.send({status:200, data:movies[e-1]})
       } 
       else { 
           res.send({status:404, error:true, message:`the movie ${e} does not exist`}) 
       } 
    })
app.get('/movies/add',(req,res) => {
    var t = req.query.title
    var y = req.query.year
    var r = req.query.rating
    if(t == undefined || y == undefined || y.length > 4 || isNaN(y)) {
        res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
    if (r == "") {
        r = 4
    }
    movies.push({title: t, year: y, rating: r})
        res.send({status:200, data:movies})
        
    })
app.get('/movies/delete/:ID',(req,res) => {
    var d = req.params.ID
    if (d > 0 && d < movies.length ) {
        movies.splice(d-1, 1)
        res.send({status:200, message: movies})
    }
    else {
        res.send({status:404, error:true, message:'the movie <ID> does not exist'})
    }

    })        

app.get('/movies/update/:ID',(req,res) => {
    let c = req.params.ID
    let x = req.query.title
    let y = req.query.year
    let z = req.query.rating

    function update(a, b) {
        if(a != undefined || a == "") {
            movies[c-1][b] = a
        }
    }

    if(c > 0 && c < movies.length ) {
        update(x, 'title')
        update(y, 'year')
        update(z, 'rating')
        res.send({status:200, message: movies})
    }
    else {
        res.send({status:404, error:true, message:'the movie <ID> does not exist'})
    }
})


app.listen(3000, () => console.log('listinig on port 3000'))