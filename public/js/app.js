var app = angular.module('Todo', [
]);


app.controller('mainController', function ($scope, $http) {

    var todoAddress = '/api/todos/';
    $scope.formData = {};
    $scope.status = "";
    $scope.todos = [];

    //get all todos
    $http.get(todoAddress).then(function (res) {
        console.log(res.data);
         
        for (var i = 0; i < res.data.length; i++) {
            var todo = res.data[i];
            console.log(res.data);
            var groupedTodo=group(todo);

            $scope.todos.push(groupedTodo);
        }

        if (res.data.length < 5) {
            $scope.pager = false;
        }
        

        return res.data;
    });


    //create a todo task
    $scope.createTodo = function (formData) {
        formData.status = "NOT DONE";

        $http.post(todoAddress, formData).then(function (res) {
            $scope.formData = {};

            $scope.todos=[];
             for (var i = 0; i < res.data.length; i++) {
            var todo = res.data[i];
            var groupedTodo=group(todo);

            $scope.todos.push(groupedTodo);
        }

        if (res.data.length < 5) {
            $scope.pager = false;
        }
           
            return res.data;
        });
    }



    //grouping function 

    var group = function (todo) {
        if (todo.status === "DONE") {
            todo.class = "done";

            console.log(todo);
        } else if (todo.status === "NOT DONE") {
            todo.class = "not-done";
            console.log(todo);
        }

        return todo;
    }


    //delete a todo task
    $scope.deleteTodo = function (id) {
        console.log(id);

        $http.delete(todoAddress + id).then(function (res) {
            $scope.todos=[];
             for (var i = 0; i < res.data.length; i++) {
            var todo = res.data[i];
            var groupedTodo=group(todo);

            $scope.todos.push(groupedTodo);
        }

        if (res.data.length < 5) {
            $scope.pager = false;
        }
           
            console.log(res.data);
            return res.data;
        });
    }




})