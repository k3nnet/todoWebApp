app.factory('Auth', ['$http', '$cookieStore', function ($http, $cookieStore) {

    //endpoints
    var AUTH_ENDPOINT = '/auth/login';
    var LOGOUT_ENDPOINT = '/auth/logout';

    var authApiUrl = '/auth/';

    var auth = {};


    //login user
    auth.login = function (user) {


        return $http.post(AUTH_ENDPOINT, { params: { username: user.username, password: user.password } }).then(function (res) {
            console.log(res);
            auth.user = res.data
            $cookieStore.put('user', auth.user);

            return auth.user;
        });
    }


    //logout user
    auth.logout = function () {
        return $http.get(LOGOUT_ENDPOINT).then(function (response) {
            console.log(response.data)
            auth.user = undefined;
            $cookieStore.remove('user');
            return auth.user;
        })

    }

    return auth;
}]);

app.factory('ToDoService', ['$http', function ($http) {
    var todoAddress = '/api/todos/';


    return {

        getAllTodos: getAllTodos,
        createTodo: createTodo,
        getTodoById:getTodoById,
        deleteTodo: deleteTodo,
        updateTodo: updateTodo,
        update:update

    }

    //get all todos

    function getAllTodos() {


       return $http.get(todoAddress).then(function (res) {

           
            console.log(res.data);

            
                var todos = [];
                for (var i = 0; i < res.data.length; i++) {
                    var todo = res.data[i];
                    var groupedTodo = group(todo);
                    console.log(groupedTodo);
                    todos.push(groupedTodo);
                }


            return todos;
        });

    }

    

    //get a specific Todo by Id

    function getTodoById(id) {
        console.log(id);
        return $http.get(todoAddress+id).then(function (res) {
              console.log(JSON.stringify(res.data));
            return res.data;
            
        })
    }


    //create todo task

    function createTodo(todo) {
           todo.currentStatus = "DITSENELE";
            todo.state = "Ditsenele"
             console.log("form data :" + JSON.stringify(todo))

             
           return $http.post(todoAddress, todo).then(function (res) {
                
                console.log(res.data);

                var todos = [];
                for (var i = 0; i < res.data.length; i++) {
                    var todo = res.data[i];
                    var groupedTodo = group(todo);
                    console.log(groupedTodo);
                    todos.push(groupedTodo);
                }

                if (res.data.length >= 4) {
                   // $scope.pager = true;
                }
                else {
                   // $scope.pager = false;
                }

                return todos;
            });




     
    }
        //grouping function 

    function group(todo) {
        if (todo.currentStatus === "DONE") {
            console.log(todo);
               todo.style={
                   "background-color":"yellow"
                }
            
        } else if (todo.currentStatus === "DITSENELE") {
             todo.style={
                    "background-color":"#E91E63"
                }


            console.log(todo);
        } else if (todo.currentStatus === "IN PROGRESS") {
            todo.style={
                    
                     "background-color":"greenyellow"
                }
          
        }

        return todo;
    }

    //update todo

    function update(todo){
        return $http.put(todoAddress +todo._id, todo).then(function (res) {
                console.log(res.data);

                return res.data;
            });

    }

    function updateTodo(todo,user) {

        console.log(todo);
        console.log(user);

        if (todo.state === "Ditsenele") {


            var id = todo._id;

            todo.state = "Done";
            todo.currentStatus = "IN PROGRESS";
            todo.runner=user.name;
            todo.style = {
                  "background-color":"greenyellow"
            }

            console.log(todo);



          return  $http.put(todoAddress + id, todo).then(function (res) {
                console.log(res.data);

                return res.data;
            });
        }
        else if (todo.currentStatus === "IN PROGRESS") {
            var id = todo._id;

            console.log(todo.state);
            todo.state = "Remove";
            todo.currentStatus = "DONE";
            todo.style = {
                "background-color": "yellow"
            }


           return $http.put(todoAddress + id, todo).then(function (res) {
                console.log(res.data);

                return res.data;
            });

        } else if (todo.currentStatus === "DONE") {
            console.log("here delete");

          /* return deleteTodo(todo).then(function(results){
                console.log("here");
                return results;
            });*/
        }

    }


    //remove todo from list
    function deleteTodo(todo){


        var id=todo._id;

        console.log(id);
        
        return $http.delete(todoAddress + id).then(function (res) {
             console.log(res);
            var todos = [];
            for (var i = 0; i < res.data.length; i++) {
                var todo = res.data[i];
                var groupedTodo = group(todo);

                todos.push(groupedTodo);
            }

            if (res.data.length < 5) {
               // $scope.pager = false;
            }

            console.log(todos);
            return todos;
        });
    
    }


}])