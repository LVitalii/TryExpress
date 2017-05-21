// Module dependencies
//create table user (id int, name varchar(20));

var express    = require('express'),
    mysql      = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database: 'tryexpress'
});

var app = express();

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected...');
});

app.get('/', function (req, res) {

    var params = {
        id : /=(\d+)&/.exec(req.url)[1],
        name : /name=(.*)/.exec(req.url)[1]
    };

    connection.query('INSERT INTO user SET ?', params, function(err, result) {
        if (err) throw err;});
    res.send('Some value is added to db');
});


// Begin listening
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});