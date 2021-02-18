const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//connect to my local database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'project_4',
    port: "3306" 
})
//check if db properly connected
connection.connect(err => {
    if (err){
        console.log("error connecting");
    }else{
        console.log("connected");
    };
    
});

//render the home page
app.get('/', function (req, res) {

    res.render('home');
    
});


app.get('/:id', function (req, res) {

   
    var idSearch = req.query.idSearch[0];
    var titleSearch = req.query.titleSearch[1];
    var directorSearch = req.query.directorSearch[2];
    
    var sql = "SELECT * FROM movies where movie_id or movie_title or director = ?";

    result = connection.query(sql, [idSearch, titleSearch, directorSearch], function (err, result) {

        var myJSON = JSON.stringify(result[0]);

        console.log(myJSON);
        res.render('test', {myJSON})
    });

});


//start teh server
app.listen(3000, function(){

    console.log("port started on port 3000");
})