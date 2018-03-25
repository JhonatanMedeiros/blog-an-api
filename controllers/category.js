'use strict';
import Category from '../models/category';

exports.getCategories = function (req, res, next) {

  let query = Category.find({}).sort({'name': 1})
    .populate('posts');

  query.exec(function(err, post) {
    if (err) {
      res.send(err);
    } else {
      res.json(post);
    }
  });

};

exports.createCategory = function (req, res) {

  const categoryTitle = req.body.name;

  if (!categoryTitle) {
    return res.status(422).send({error: 'Digite o Nome da Categoria!'});
  }

  Category.findOne({text: categoryTitle.toLowerCase()}, function (err, existingCategory) {

    if (err) {
      return next(err);
    }

    if (existingCategory) {
      return res.status(422).send({error: 'Já existe uma Categoria com esse nome!'});
    }


    let new_category = new Category({
      name: categoryTitle,
      text: categoryTitle
    });

    new_category.save(function (err, category) {
      if (err) {
        res.send(err);
      } else {
        res.json(category);
      }
    });

  });
};

exports.getCategory = function (req, res) {

  Category.findById(req.params.categoryId)
    .populate('posts')
    .exec(function (err, category) {

      if (err) {
        res.send(err);
      } else {
        res.json(category);
      }
    });
};

exports.editCategory = function (req, res) {

  Category.findOneAndUpdate({_id: req.params.categoryId},
    req.body, {
      new: false
    },
    function (err, category) {
      if (err) {
        res.send(err);
      } else {
        res.json(category);
      }
    });
};

exports.deleteCategory = function (req, res) {

  Category.remove({_id: req.params.categoryId}, function (err, category) {

    if (err) {
      res.send(err);
    } else {
      res.json({message: 'Category successfully deleted'});
    }
  });
};