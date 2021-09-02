const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) =>{
    const sqlSelect = "select * from reviews_movies;";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    })
});

app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    
    const sqlInsert = "insert into reviews_movies (movieName, movieReview) values (?, ?);";

    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
            console.log(result);
    });

});

app.delete("/api/delete/:movieName", (req, res) =>{

    const name = req.params.movieName;
    
    const sqlDelete = "delete from reviews_movies where movieName = ?";
    db.query(sqlDelete, name, (err, result) => {
       if (err) console.log(err);
    })
})

app.put("/api/update/", (req, res) =>{

    const name = req.body.movieName;
    const review = req.body.movieReview;
    
    const sqlUpdate = "update reviews_movies set movieReview = ? where movieName = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
       if (err) console.log(err);
    })
})

app.listen(3001, ()=>{
    console.log("running server on 3001 port");
});