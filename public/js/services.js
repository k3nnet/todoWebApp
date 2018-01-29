app.factory('Auth',['$http','$cookieStore',function($http,$cookieStore){

//endpoints
var AUTH_ENDPOINT='/auth/login';
var LOGOUT_ENDPOINT='/auth/login';

 var authApiUrl = '/auth/';

var auth={};


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
    return $http.post(authApiUrl + 'logout').then(function (response) {
      console.log(response.data)
      auth.user = undefined;
      $cookieStore.remove('user');
    })

  }

return auth;
}]);

app.factory('ToDo',[function(){


}])