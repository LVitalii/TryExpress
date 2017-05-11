var mysql = require('mysql');
var express = require('express');

var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'tryexpress'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected...')
});

// connection.query('INSERT INTO people (name, age, address) VALUES (?, ?, ?)', ['Marry', '44', 'California, USA'], function(err, results) {
//     if (err) throw err;
// });

app.get("/", function (res, req) {
    connection.query('SELECT * FROM people', function(err, results) {
        if (err) throw err;
        console.log(results[0].id);
        console.log(results[0].name);
        console.log(results[0].age);
        console.log(results[0].address);
        res.send('Request has been finished');
        connection.end();
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
