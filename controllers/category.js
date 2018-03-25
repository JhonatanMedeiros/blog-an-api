'use strict';
import Category from '../models/category';



/**
 * Get All Categories
 */

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


/**
 * Get Sigle Category by Id
 */

exports.getCategory = function (req, res) {

  Category.findById(req.params.categoryId)
    .populate('posts')
    .exec(function (err, category) {

      if (err || !category) {
        res.status(404).json({message: 'Não existe essa categoria!'});
      } else {
        res.json(category);
      }
    });
};


/**
 * Create an Category
 */

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


/**
 * Edit an Category
 */

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


/**
 * Delete an Category
 */

exports.deleteCategory = function (req, res) {

  Category.remove({_id: req.params.categoryId}, function (err, category) {

    if (err || !category) {
      res.status(404).json({message: 'Não existe essa categoria!'});
    } else {
      res.json({message: 'Categoria removida com sucesso!'});
    }
  });
};