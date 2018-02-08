var Todo = require('../models/todo');
var async = require('async')
module.exports = {
    //get all  Todos
    getToDo: function (req, res) {
         console.log(req.body);
        // use mongoose to get all todos in the database
        Todo.find(function (err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    },

    //create and send back all Todos
    create: function (req, res) {
        console.log(req.body)
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            currentStatus: req.body.currentStatus,
            state: req.body.state
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    },
    //get Todo  by id
    getById: function (req, res) {
        console.log(req.body);
        if (!req.params.todoId) {
            res.status(500).send('ID field is required.')
        }
        else {
            Todo.find({ _id: req.params.todoId }).exec(function (err, result) {

                res.send(result);

            });
        }
    },//update Todo 
    update: function (req, res) {
        var todoId = req.body._id;
        console.log(req.body);
        var todo = new Todo(req.body);
        Todo.update({ _id: todoId }, { $set: req.body }, { multi: false }).exec(function (err, results) {
            res.send(results);
        });

    },//remove a todo 
    remove: function (req, res) {
        console.log(req.params);

        Todo.remove({ _id: req.params.todo_id }, function (err, numRemoved) {
            if (err) {
                res.status(500).send(err)
            }
            else {


                // get and return all the todos after you create another
                Todo.find(function (err, todos) {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.json(todos);
                       // res.sendStatus(200)
                    }

                });
            }
        })

    }





}