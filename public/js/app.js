var app = angular.module('Todo', [
    'ui.router',
    'ngCookies',
    'ngAnimate'
]);

app.run(['$rootScope', '$state', '$cookieStore', 'Auth', function ($rootScope, $state, $cookieStore, Auth) {

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.log(error)
        if (error.unAuthorized) {
            $state.go('login');
        } else if (error.authorized) {
            $state.go('home');
        }
    })

    Auth.user = $cookieStore.get('user');
}]);


app.controller('MainController', function ($scope, $cookieStore, Auth, $http, $state, ToDoService) {


    var user = $cookieStore.get('user').user;
    console.log(user);
    $scope.formData = {};
    $scope.style = {};



    ToDoService.getAllTodos().then(function (results) {
        $scope.todos = results;




        if (results.length >= 4) {
            $scope.pager = true;
        }
        else {
            $scope.pager = false;
        }
    })


    $scope.createTodo = function (todo) {
         console.log(todo);
         
        ToDoService.createTodo(todo).then(function (results) {
              $scope.todos = results;
              $scope.formData={};
            console.log(results);
        })
    }








    $scope.logout = function () {
     
        Auth.logout().then(function(results){
            $state.go('login');
        })

    }









    $scope.update = function (todo) {

        
        
        ToDoService.updateTodo(todo,user).then(function(results){
        
            if(results instanceof Array){
               $scope.todos = results;
            }
           
        });


    }




    //delete a todo task

    $scope.deleteTodo=function (todo) {
        ToDoService.deleteTodo(todo).then(function(results){
            console.log("here");
        })
    }





});

app.controller('LoginController', function (Auth, $scope, $state) {


    $scope.user = {}
    $scope.buttonText = "Login";
    $scope.login = function (user) {
        $scope.buttonText = "Loggin..";

        Auth.login(user).then(function (results) {
            console.log(results)

            if (results.success) {
                $state.go('home');
                $scope.buttonText = "Login";
            }
            else {
                $scope.invalidLogin = true;
                $scope.message = results.message;
                $scope.buttonText = "Login";
            }


        });
    }

})

app.controller('MoreDetailsController',function($stateParams,ToDoService,$scope){

    console.log($stateParams)
    var id=$stateParams.id;

     ToDoService.getTodoById(id).then(function(results){
         
         console.log(results[0])
         $scope.singleTodo=results[0];
     });
    

    $scope.closeTodo=function(id){
        $state.go('home')
    }
})

app.controller('SubtaskController',function(ToDoService,$scope,$stateParams){

    var id=$stateParams.id

       ToDoService.getTodoById(id).then(function(results){
         
         console.log(results[0])
         $scope.todo=results[0];
     });



    




})