var User = require('../models/user');

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
                var user = new User(req.body);


                user.save(function (err, result) {
                    if (err) {
                        res.status(500).send({ message: err.message });
                    }
                    res.status(200).send({ token: createToken(result) });

                })

            })

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

                    if (user.password != req.body.params.password) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {

                        var token = createToken(user);

                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
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