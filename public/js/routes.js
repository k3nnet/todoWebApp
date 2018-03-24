app.config(function($stateProvider,$urlRouterProvider){

    $stateProvider.state('home',{
        url:"/home",
        templateUrl:'templates/home.html',
        controller:'MainController'
    }).state('login',{
        url:'/',
        templateUrl:'templates/login.html',
        controller:'LoginController'
    }).state('moreDetails',{
       url:'/moreDetails/:id',
        templateUrl:'/templates/moreDetails.html',
        controller:'MoreDetailsController'
    }).state('addsubTask',{
       url:'/addsubTask/:id',
        templateUrl:'/templates/subtask.html',
        controller:'SubtaskController'
    }).state('completedTodos',{
       url:'/completed',
        templateUrl:'/templates/completedTodo.html',
        controller:'CompletedTodoController'
    });
    
    $urlRouterProvider.otherwise('/');
})