var Todo = require('../models/todo');
var async = require('async')
module.exports = {
    //get all  Todos
    getToDo:function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    }, 
    
    //create and send back all Todos
    create: function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    },
    //get Todo product by id
    getProduct: function (req, res) {
        console.log(req.body);
        if (!req.params.productId) {
            res.status(500).send('ID field is required.')
        }
        else {
            Todo.find({ _id: req.params.productId }).exec(function (err, result) {

            res.send(result);

        });
        }
    },//update Todo product
    update:function(req,res){
        var productId = req.body._id;
        console.log(req.body);
          var product = new Todo(req.body);
          Todo.update({ _id: productId },{$set:req.body},{multi:false}).exec(function(err,results){
              res.send(results);
          });

    },//remove a todo 
    remove:function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    }
   




}