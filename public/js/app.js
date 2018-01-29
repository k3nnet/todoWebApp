var app = angular.module('Todo', [
    'ui.router',
    'ngCookies'
]);

app.run(['$rootScope','$state','$cookieStore','Auth',function($rootScope,$state,$cookieStore,Auth){

    $rootScope.$on('$stateChangeError',function(event,toState,toParams,fromState,fromParams,error){
        console.log(error)
        if(error.unAuthorized){
            $state.go('login');
        }else if(error.authorized){
          $state.go('home');
        }
    })

    Auth.user=$cookieStore.get('user');
}]);


app.controller('MainController', function ($scope, $http) {

    var todoAddress = '/api/todos/';
    $scope.formData = {};
    $scope.style = {};
    $scope.todos = [];

    //get all todos
    $http.get(todoAddress).then(function (res) {
       // console.log(res.data);

        for (var i = 0; i < res.data.length; i++) {
            var todo = res.data[i];
           // console.log(res.data);
            var groupedTodo = group(todo);
           console.log(groupedTodo );
            $scope.todos.push(groupedTodo);
        }

        
            if (res.data.length >= 4) {
                $scope.pager = true;
            }
            else{
                $scope.pager = false;
            }


        return res.data;
    });


    //create a todo task
    $scope.createTodo = function (formData) {
        formData.currentStatus = "DITSENELE";
        formData.state = "Ditsenele"

        console.log("form data :"+ JSON.stringify(formData))

        $http.post(todoAddress, formData).then(function (res) {
            $scope.formData = {};

            $scope.todos = [];
            for (var i = 0; i < res.data.length; i++) {
                var todo = res.data[i];
                 var groupedTodo = group(todo);
           console.log(groupedTodo );
            $scope.todos.push(groupedTodo);
            }

            if (res.data.length >= 4) {
                $scope.pager = true;
            }
            else{
                $scope.pager = false;
            }

            return res.data;
        });
    }



    //grouping function 

    var group = function (todo) {
        if (todo.currentStatus === "DONE") {
            console.log(todo);
               todo.style={
                    "background-color":"greenyellow"
                }
            
        } else if (todo.currentStatus === "DITSENELE") {
             todo.style={
                    "background-color":"#E91E63"
                }


            console.log(todo);
        } else if (todo.currentStatus === "IN PROGRESS") {
            todo.style={
                    "background-color":"yellow"
                }
          
        }

        return todo;
    }

    $scope.update = function (todo) {
        console.log(todo);
        if (todo.state === "Ditsenele") {
            

            var id=todo._id;

            todo.state = "Done";
            todo.currentStatus = "IN PROGRESS"
             todo.style={
                    "background-color":"yellow"
                }
          
            console.log(todo);



            $http.put(todoAddress + id,todo).then(function (res) {
                console.log(res.data);
                
                return res.data;
            });


            // deleteTodo(todo._id);





        }
        else if (todo.currentStatus === "IN PROGRESS") {
            var id=todo._id;
            
            console.log(todo.state);
            todo.state = "Remove";
            todo.currentStatus = "DONE";
                todo.style={
                    "background-color":"greenyellow"
                }
          

              $http.put(todoAddress + id,todo).then(function (res) {
                console.log(res.data);
                
                return res.data;
            });
            
        } else if (todo.currentStatus === "DONE") {
            
            console.log(todo.state);
            todo.state = "complete";
            todo.currentStatus = "REMOVED"
            deleteTodo(todo._id);
        }

    }




    //delete a todo task
    var deleteTodo = function (id) {
        console.log(id);



        $http.delete(todoAddress + id).then(function (res) {
            $scope.todos = [];
            for (var i = 0; i < res.data.length; i++) {
                var todo = res.data[i];
                var groupedTodo = group(todo);

                $scope.todos.push(groupedTodo);
            }

            if (res.data.length < 5) {
                $scope.pager = false;
            }

            console.log(res.data);
            return res.data;
        });
    }




});

app.controller('LoginController',function(Auth,$scope,$state){

   
    $scope.user={}
    $scope.buttonText="Login";
    $scope.login=function(user){
        $scope.buttonText="Loggin..";

        Auth.login(user).then(function(results){
            console.log(results)

            if(results.success){
              $state.go('home');
              $scope.buttonText="Login";
            }
            else{
                 $scope.invalidLogin=true;
                 $scope.message=results.message;
                  $scope.buttonText="Login";
            }
       
           
        });
    }

})