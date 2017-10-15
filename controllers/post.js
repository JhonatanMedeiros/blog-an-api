const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    Post = require('../models/post'),
    config = require('../config/main');


exports.getPosts = function (req, res, next) {

    Post.find({}, function(err, post) {
        if (err) {
            res.send(err);
        }else {
            res.json(post);
        }
    });

};

exports.createPost = function(req, res) {
    var new_post = new Post(req.body);
    new_post.save(function(err, post) {
        if (err) {
            res.send(err);
        }else {
            res.json(post);
        }
    });
};

exports.getPost = function(req, res) {
    Post.findById(req.params.postId, function(err, post) {
        if (err) {
            res.send(err);
        }else {
            res.json(post);
        }
    });
};


exports.editPost = function(req, res) {
    Post.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true}, function(err, post) {
        if (err) {
            res.send(err);
        }else {
            res.json(post);
        }
    });
};


exports.delPost = function(req, res) {

    Post.remove({
        _id: req.params.postId
    }, function(err, post) {

        if (err) {
            res.send(err);
        }else {
            res.json({ message: 'Task successfully deleted' });
        }
    });
};
