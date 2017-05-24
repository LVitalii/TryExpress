// Module dependencies
//create table user (id int, name varchar(20));

var express    = require('express'),
    mysql      = require('mysql');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// Application initialization
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database: 'tryexpress'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected...');
});

//Sequelize
var sequelize = new Sequelize("tryexpress", "root", "admin");
var Users = sequelize.define("users", {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,}, {timestamps: false});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/', function (req, res) {
    var params = {
        name : req.body.name,
        password : req.body.password,
        email : req.body.email
    }

    //just for example how to use regexp
    // var params = {
    //     id : /=(\d+)&/.exec(req.url)[1],
    //     name : /name=(.*)/.exec(req.url)[1]
    // };

    sequelize.sync().then(()=>Users.create(params)).then(() => res.send('Values are added to db'));

    // connection.query('INSERT INTO users SET ?', params, function(err, result) {
    //     if (err) throw err;});
    // res.send('Values are added to db');
});

app.get("/", function (req, res) {
    var emailReq = req.query.email;
    var usersInDb;

    //works
    // connection.query('SELECT * FROM users', function(err, result) {
    //     if (err) throw err;
    //     usersInDb = result;
    //     res.json(usersInDb);
    // });

    Users.findAll({where: {email: emailReq}}).then(users=>{usersInDb = users;}).then(() => res.json(usersInDb));

    //does not wort. It says that it is deprecated.
    // Users.findAll({attributes: ["name", "password"]}, {where: {email: emailReq}});


})

// Begin listening
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});