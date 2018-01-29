app.config(function($stateProvider,$urlRouterProvider){

    $stateProvider.state('home',{
        url:"/home",
         resolve: {
          user: ['Auth', '$q', function (Auth, $q) {
            console.log(Auth.user)

            return Auth.user || $q.reject({ unAuthorized: true });
          }]
        },
        templateUrl:'templates/home.html',
        controller:'MainController'
    }).state('login',{
        url:'/',
        resolve:{
          user:['Auth','$q',function(Auth,$q){

            if(Auth.user){
              return $q.reject({authorized:true});
            }

          }]
        },
        templateUrl:'templates/login.html',
        controller:'LoginController'
    });
    
    $urlRouterProvider.otherwise('/');
})