app.directive('feedbacks', function (ToDoService,$cookieStore) {
    return {
        restrict: 'AE',
        scope: {
            todo: '='
        },
        templateUrl: '/../templates/directives/feedback.html',
        link: function (scope, elem, attr) {


            var user=$cookieStore.get('user');


            scope.savefeedback = function () {
                var todoId = scope.todo._id;

                console.log(user);

                scope.feedback.datePublished = new Date(); //attach date posted on feedbacks
                 scope.feedback.user=user.user.username;


                console.log(scope.todo.feedbacks)


                scope.todo.feedbacks.push(scope.feedback); //add the feedback to the post
                console.log(scope.todo.feedbacks)
                scope.feedback = {};
                var updatedTodo = scope.todo;

                ToDoService.update(updatedTodo); //update post in database



            }
        }
    }
})

app.directive('addSubTask', function (ToDoService) {

    return {
        restrict: 'EA',
        templateUrl: '/../templates/directives/addsubTask.html',
        scope:{
            todo:'='

        },
        link:  function (scope, elem, attr) {


            scope.add = function () {
                var todoId = scope.todo._id;




                console.log(scope.todo)


                scope.todo.subTasks.push(scope.subtask); //add subtask to todo
                console.log(scope.todo.subtasks)
                scope.subtask = {};
                var updatedTodo = scope.todo;

                ToDoService.update(updatedTodo); //update tod in database



            }
        }
    }
})

app.directive('navBar',function(){

    return{
        restrict:'EA',
        templateUrl:'templates/directives/navbar.html',
        controller:'MainController'

    }
})