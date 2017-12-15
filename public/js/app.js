var app = angular.module('Todo', [
]);


app.controller('mainController', function ($scope, $http) {

    var todoAddress = '/api/todos/';
    $scope.formData = {};

    //get all todos
    $http.get(todoAddress).then(function (res) {
        console.log(res.data);
        $scope.todos = res.data;
        return res.data;
    });

    
    //create a todo task
    $scope.createTodo = function () {

        $http.post(todoAddress, $scope.formData).then(function (res) {
            $scope.formData={};
            $scope.todos = res.data;
            console.log(res.data);
            return res.data;
        });
    }
  

   //delete a todo task
    $scope.deleteTodo=function(id){

        $http.delete(todoAddress + Id).then(function (res) {
          $scope.todos = res.data;
          console.log(res.data);
          return res.data;
        });
    }




})