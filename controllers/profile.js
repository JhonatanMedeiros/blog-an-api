'use strict';
import User from '../models/user';

exports.userMe = function (req, res, next) {

  User.findOne({_id: req.params.userId}, function (err, user) {

    if (err) return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');
    res.status(200).send(user);

  });

};

exports.editMe = function (req, res, next) {

  const token = req.body.token;

  User.findOneAndUpdate({token: token},
    req.body,
    function (err, user) {

      if (err) {
        res.status(500).send('There was a problem finding the user.');
      }

      if (!user) {
        res.status(404).send('No user found.');
      }
      res.status(200).json(user);
    });

};