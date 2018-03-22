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
    var doneAddres='api/done';


    return {

        getAllTodos: getAllTodos,
        createTodo: createTodo,
        getTodoById:getTodoById,
        deleteTodo: deleteTodo,
        updateTodo: updateTodo,
        update:update,
        getAllDone:getAllDone

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


    function getAllDone(){

        return $http.get(doneAddres).then(function (res) {

           
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
            
        }).catch(function(err){
            console.log("error in services")
            console.log(err);
        })
    }


    //create todo task

    function createTodo(todo) {
           todo.currentStatus = "DITSENELE";
            todo.state = "Ditsenele";
            todo.runner="Unassigned"
            todo.created=new Date();
             console.log("form data :" + JSON.stringify(todo))

             
           return $http.post(todoAddress, todo).then(function (res) {
                
                console.log(res.data);

                return res.data;

            
            });




     
    }
        //grouping function 

    function group(todo) {
        if (todo.currentStatus === "DONE") {
            console.log(todo);
               todo.style={
                   "background-color":"#9c27b0"
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

            todo.state = " ";
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

          return deleteTodo(todo).then(function(results){
                console.log("here");
                return results;
            });
        }

    }


    //remove todo from list
    function deleteTodo(todo){


        var id=todo._id;

        console.log(id);

        var doneTodo=todo;
        console.log("====todo from params======");
            console.log(todo);
            console.log("=====todo from done todo=========");
            console.log(doneTodo);
        
        return $http.delete(todoAddress + id).then(function (res) {
             console.log(res);
            var todos = [];
            console.log("====todo from params======");
            console.log(todo);
            console.log("=====todo from done todo=========");
            console.log(doneTodo);

              $http.post('/api/done/', doneTodo).then(function (res) {
                
                console.log(res.data);

            
            });

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