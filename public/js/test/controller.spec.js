describe('Auth factory',function(){
     var Auth;


// tesing user
     var user={
         email:"test@email.com",
         password:"test"
     }


//testing login single user object
     var singleUser={ _id: '5aab90fa9cb697325408437a',
  username: 'test@email.com',
  password: '1e5d1c11f7f49f850a234f4cad23e95fbef38e85e43abe43a8212f7caf8b468b293e28827c898193acf518adf4eaacb2c15bcf42e795b4caff7f6f7466540f2e',
  salt: '41f0c295a171950b',
  name: 'testing test',
  __v: 0 }


  var loginUser;

  

  // Before each test load our Todo module
  beforeEach(angular.mock.module('Todo'));

  // Before each test set our injected Auth factory (_Auth_) to our local Auth variable
  beforeEach(inject(function(_Auth_) {
    Auth = _Auth_;


  }));

  // A simple test to verify the Auth factory exists
  it('should exist', function() {
    expect(Auth).toBeDefined();
  });



  describe('.login',function(){
      
      //test to verify that login function exists
      it('should exist',function(){

          expect(Auth.login).toBeDefined();
      });


      //test to verify that user can successfully login
      it('should return a user object',function(){

              Auth.login(user).then(function(result){
                  console.log(result)

        
             expect(result.success).toEqual(false);
    })

         
      })


      //test to verify tha user login unsuccessful

      it('should return undefined if login is unsuccessful',function(){


      })
  })


});