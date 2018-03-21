//set up ============================
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config=require('./config');
var todo=require('./controllers/todo');
var auth=require('./controllers/auth');
var publicPath 	= '/../public/';
var path=require('path');
var cors=require('./cors');


//configuration ================
mongoose.connect(config.database);

app.use(express.static(__dirname + '/public'));                 
                                        
app.use(bodyParser.urlencoded({ 'extended': 'true' }));          
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());


app.use(cors);
//public routes
app.use(express.static(path.resolve(__dirname + publicPath)))
app.use(express.static(path.resolve(__dirname + '/../bower_components')))

app.get('/', function (req, res) {

	res.sendFile(path.resolve(__dirname, publicPath, '/index.html'))
})


//api routes==================================

app.post('/auth/login',auth.login);
app.get('/auth/logout',auth.logout);
app.post('/auth/register',auth.register);

//api routes==================================
app.get('/api/todos/:id',todo.getById);
app.get('/api/todos',todo.getToDo);
app.post('/api/todos',todo.create);
app.delete('/api/todos/:todo_id',todo.remove);
app.put('/api/todos/:todo_id',todo.update);
app.get('/api/done',todo.getDone);

app.post('/api/done',todo.done);


// listen (start app with node server.js) ======================================

var server=app.listen(2000,function(){

	var port=server.address().port;
	var host=server.address().address;
	console.log("App listening on http://%s:%s",port,host);
});
