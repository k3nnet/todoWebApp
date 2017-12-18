//set up ============================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config=require('./config');
var todo=require('./controllers/todo');
var publicPath 	= '/../public/';
var path=require('path');


//configuration ================
mongoose.connect(config.database);

app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({ 'extended': 'true' }));          
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());


//public routes
app.use(express.static(path.resolve(__dirname + publicPath)))
app.use(express.static(path.resolve(__dirname + '/../bower_components')))

app.get('/', function (req, res) {

	res.sendFile(path.resolve(__dirname, publicPath, '/index.html'))
})



//api routes==================================
app.get('/api/todos',todo.getToDo);
app.post('/api/todos',todo.create);
app.delete('/api/todos/:todo_id',todo.remove);
app.put('/api/todos/:todo_id',todo.update);


// listen (start app with node server.js) ======================================
app.listen(2000);
console.log("App listening on port 2000");