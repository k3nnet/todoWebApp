var User = require('../models/user');
var crypto=require('crypto');
var jwt = require('jwt-simple');
var moment = require('moment');


module.exports =
    {
        register: function (req, res) {
            console.log(req.body.username);



            User.findOne({ username: req.body.username }, function (err, existingUser) {

                if (existingUser) {
                    return res.status(409).send({ message: "email already registerd" })
                }
             var passwordData=saltHashPassword(req.body.password);

            var newUser={
                username:req.body.username,
                password:passwordData.passwordHash,
                salt:passwordData.salt,
                name:req.body.name
            }
            var user = new User(newUser);


                user.save(function (err, result) {
                    if (err) {
                        res.status(500).send({ message: err.message });
                    }
                    res.status(200).send({ token: createToken(result) });

                })

            })

        },

        logout:function(req,res){

            res.json({ success: true, message: 'logout' });

        },

        login: function (req, res) {
            console.log(req.body.params)

            User.findOne({
                username: req.body.params.username
            }, function (err, user) {

                if (err) throw err;

                if (!user) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                } else if (user) {

                    console.log(user);
                var passwordData=sha512(req.body.params.password,user.salt);

                console.log("userHash= "+user.password);
                console.log("databapassword= "+passwordData.passwordHash);

                // check if password matches
                if (user.password != passwordData.passwordHash){
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {

                        var token = createToken(user);

                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token,
                            user:user
                        })


                    }
                }
            })

        },

    }


function createToken(user) {
    var payload = {
        sub: user._id,
        ia: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, 'secret');

}

//generate random string of characters i.e salt

var genRandomString=function(length){

	return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}


function sha512(password,salt){

	var hash=crypto.createHmac('sha512',salt);
	hash.update(password);
	var value=hash.digest('hex');

	return{
		salt:salt,
		passwordHash:value
	};
}



function saltHashPassword(userpassword){

	var salt=genRandomString(16);
	var passwordData=sha512(userpassword,salt);
  // console.log("userpassword="+userpassword);
//	console.log('passwordHash='+passwordData.passwordHash);
//	console.log('nsalt='+passwordData.salt);

    return {
        salt:salt,
        passwordHash:passwordData.passwordHash
    }
	
}