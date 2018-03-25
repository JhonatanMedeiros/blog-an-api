'use strict';
import Post from '../models/post';



/**
 * Get All Posts
 */

exports.getPosts = function (req, res, next) {

  let query = Post.find({}).sort({'updatedAt': -1})
    .populate({ path: 'category', select: 'name' })
    .populate({ path: 'author', select: 'profile' });


  query.exec(function(err, blogPosts) {
    if (err) {
      res.send(err);
    } else {
      res.json(blogPosts);
    }
  });

};


/**
 * Get Sigle Post By Id
 */

exports.getPost = function (req, res) {


  Post.findById(req.params.postId)
    .populate({ path: 'category', select: 'name' })
    .populate({ path: 'author', select: 'profile' })
    .exec(function (err, post) {

      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
};


/**
 * Get Sigle Post By Post URL
 */

exports.getPostURL = function (req, res) {

  let query = Post.findOne({titleUrl: req.params.postUrl})
    .populate({ path: 'category', select: 'name' })
    .populate({ path: 'author', select: 'profile' });

  query.exec(function(err, blogPosts) {

    if (!err) {

      if (!blogPosts) {
        res.status(404).json({message: 'Não existe essa postagem!'});
      } else {
        res.json(blogPosts);
      }

    } else {
      res.status(404).json({message: 'Não existe essa postagem!'});
    }
  });
};


/**
 * Create an Post
 */

exports.createPost = function (req, res) {


  if (!req.body.title) {
    return res.status(422).send({error: 'Digite o Titulo da Postagem!'});
  }

  if (!req.body.titleUrl) {
    return res.status(422).send({error: 'Digite o Titulo da URL da Postagem!'});
  }

  if (!req.body.content) {
    return res.status(422).send({error: 'Digite o conteudo da Postagem!'});
  }

  if (!req.body.author) {
    return res.status(422).send({error: 'Digite o nome do Autor da Postagem!'});
  }


  let new_post = new Post({
    title: req.body.title,
    titleUrl: slugify(req.body.titleUrl),
    content: req.body.content,
    author: req.body.author,
    category: req.body.category
  });

  Post.findOne({titleUrl: req.body.titleUrl}, function (err, post) {
    
    if (!err) {
      
      if (!post) {

        new_post.save(function (err, post) {
          if (err) {
            res.send(err);
          } else {

            Post.findById(post._id)
              .populate({ path: 'category', select: 'name' })
              .populate({ path: 'author', select: 'profile' })
              .exec(function (err, post) {

                if (err) {
                  res.send(err);
                } else {
                  res.json(post);
                }

              });

          }
        });

      } else {
        res.json({message: 'Já existe uma postagem com essa url!'});
      }
      
    } else {
      res.send(err);
    }
    
  });


};


/**
 * Edit an Post
 */

exports.editPost = function (req, res) {

  if (!req.body.title) {
    return res.status(422).send({error: 'Digite o Titulo da Postagem!'});
  }

  if (!req.body.content) {
    return res.status(422).send({error: 'Digite o conteudo da Postagem!'});
  }

  if (!req.body.author) {
    return res.status(422).send({error: 'Digite o nome do Autor da Postagem!'});
  }

  Post.findOne({ _id: req.params.postId }, (err, post) => {

    if (!err) {

      if (post) {

        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.body.author;
        post.category = req.body.category;



        post.save(function (err, post) {
          if (err) {
            res.send(err);
          } else {

            Post.findById(post._id)
              .populate({ path: 'category', select: 'name' })
              .populate({ path: 'author', select: 'profile' })
              .exec(function (err, post) {

                if (err) {
                  res.send(err);
                } else {
                  res.json(post);
                }

              });

          }
        });

      } else {
        res.status(404).json({message: 'Não existe essa postagem!'});
      }


    } else {
      res.status(404).json({message: 'Não existe essa postagem!'});
    }

  })
};


/**
 * Delete an Post
 */

exports.delPost = function (req, res) {

  Post.remove({_id: req.params.postId}, function (err, post) {

    if (err || !post) {
      res.status(404).json({message: 'Não existe essa postagem!'});
    } else {
      res.json({message: 'Postagem removida com sucesso'});
    }
  });
};


function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}