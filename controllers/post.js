'use strict';
import Post from '../models/post';

exports.getPosts = function (req, res, next) {

  let query = Post.find({}).sort({'updatedAt': -1});
  query.exec(function(err, blogPosts) {
    if (err) {
      res.send(err);
    } else {
      res.json(blogPosts);
    }
  });

};

exports.createPost = function (req, res) {

  const postTitle = req.body.title;
  const postTitleUrl = req.body.titleUrl;
  const postContent = req.body.content;
  const postAuthor = req.body.author;
  const postAuthorId = req.body.authorId;
  const category = req.body.category;

  if (!postTitle) {
    return res.status(422).send({error: 'Digite o Titulo da Postagem!'});
  }

  if (!postTitleUrl) {
    return res.status(422).send({error: 'Digite o Titulo da URL da Postagem!'});
  }

  if (!postContent) {
    return res.status(422).send({error: 'Digite o conteudo da Postagem!'});
  }

  if (!postAuthor) {
    return res.status(422).send({error: 'Digite o nome do Autor da Postagem!'});
  }

  if (!postAuthorId) {
    return res.status(422).send({error: 'Digite o ID do Autor da Postagem!'});
  }

  Post.findOne({titleUrl: postTitleUrl}, function (err, existingPost) {
    if (err) {
      return next(err);
    }

    if (existingPost) {
      return res.status(422).send({error: 'Já existe uma Postagem com essa URL!'});
    }

    var new_post = new Post(req.body);

    new_post.save(function (err, post) {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });

  })
    .populate('Category')
    .exec(function (err, Category) {
      if (err) console.log(err);
      console.log(Category);
    });
};

exports.getPost = function (req, res) {

  Post.findById(req.params.postId, function (err, post) {
    if (err) {
      res.send(err);
    } else {
      res.json(post);
    }
  });
};

exports.getPostURL = function (req, res) {

  Post.findOne({titleUrl: req.params.postUrl}, function (err, post) {
    if (err) {
      res.send(err);
    } else {
      res.json(post);
    }
  });
};

exports.editPost = function (req, res) {

  Post.findOneAndUpdate({_id: req.params.postId},
    req.body, {
      new: false
    },
    function (err, post) {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
};

exports.delPost = function (req, res) {

  Post.remove({_id: req.params.postId}, function (err, post) {

    if (err) {
      res.send(err);
    } else {
      res.json({message: 'Post successfully deleted'});
    }
  });
};
