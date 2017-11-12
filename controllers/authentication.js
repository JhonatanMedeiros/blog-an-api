const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    User = require('../models/user'),
    config = require('../config/main');

function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

// Set user info from request
function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role
    }
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

    // Check for registration errors
    const email = req.body.email;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'Digite seu Email.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'Digite sua senha.' });
    }

    User.findOne({ email: email }, function(err, user) {

        if (err) {
            return res.status(422).send(err)
        }

        if(!user) {
            return res.status(422).send({ error: 'Esse email não existe.' })
        }

        user.comparePassword(password, function(err, isMatch) {

            if (err) {
                return res.status(422).send(err);
            }

            if (!isMatch) {
                return res.status(422).send({ error: 'A senha está incorreta.' });
            }


            let userInfo = setUserInfo(user);

            return res.status(201).json({
                token: generateToken(userInfo),
                user: userInfo
            });
        });
    });



}


//========================================
// Token Route
//========================================
exports.token = function (req, res, next) {

    const token = req.headers['authorization'];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {

        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        return res.status(200).send({ auth: true, message: 'Success to authenticate.' });
    });
};


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.'});
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({ error: 'You must enter your full name.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
            email: email,
            password: password,
            profile: {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        });

        user.save(function(err, user) {
            if (err) { return next(err); }

            // Subscribe member to Mailchimp list
            // mailchimp.subscribeToNewsletter(user.email);

            // Respond with JWT if user was created

            let userInfo = setUserInfo(user);

            res.status(201).json({
                token: generateToken(userInfo),
                user: userInfo
            });
        });
    });
}

//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {
    return function(req, res, next) {
        const user = req.user;

        User.findById(user._id, function(err, foundUser) {

            if (err) {
                res.status(422).json({ error: 'No user was found.' });
                return next(err);
            }

            // If user is found, check role.
            if (foundUser.role == role) {
                return next();
            }

            res.status(401).json({ error: 'You are not authorized to view this content.' });
            return next('Unauthorized');
        })
    }
};

exports.userMe = function (req, res, next) {

    const token = req.body.token;

    User.findOne({ token: token }, function(err, user) {

        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);

    });

};