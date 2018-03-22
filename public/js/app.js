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


app.controller('MainController', function ($scope, $cookieStore, Auth, $http, $state,$filter, ToDoService) {


    var user = $cookieStore.get('user').user;
    console.log(user);
    $scope.formData = {};
    $scope.style = {};
    
   
 $scope.$watch("todo.tasks", function(n, o) {
     console.log(o);
     console.log(n);
        var trues = $filter("filter")(n, {
            val: true
        });
        $scope.flag = trues.length;
    }, true);


    ToDoService.getAllTodos().then(function (results) {
        $scope.todos = results;




        if (results.length >= 4) {
            $scope.pager = true;
        }
        else {
            $scope.pager = false;
        }
    })


    $scope.setTodo=function(todo){

        
        $scope.todo=todo;
        console.log(todo);

    }



    $scope.createTodo = function (todo) {
         console.log(todo);
         
        ToDoService.createTodo(todo).then(function (results) {

            results.forEach(function(todo){
                console.log(todo);
                $scope.todos.push(todo);
            })
             // $scope.todos = results;
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
    console.log("==============id=========");
    console.log(id);

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

    $scope.subtask={};

       ToDoService.getTodoById(id).then(function(results){
         
         console.log(results[0])
         $scope.todo=results[0];
     });




     $scope.addsubTask=function(subtask){
         subtask.done=false;
         subtask.closed=new Date();
         console.log(subtask)
         var todo=$scope.todo;
         console.log(todo.subTasks);
      


                todo.subTasks.push(subtask);
                console.log(todo.subTasks)
                $scope.subtask = {};
      

                ToDoService.update(todo); //update post in database
     }
     



    




})

app.controller('CompletedTodoController',function($scope,ToDoService){

    
    ToDoService.getAllDone().then(function (results) {

        console.log(results);
        $scope.todos = results;




        if (results.length >= 4) {
            $scope.pager = true;
        }
        else {
            $scope.pager = false;
        }
    })
})