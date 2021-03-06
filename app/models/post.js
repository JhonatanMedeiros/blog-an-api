'use strict';
import mongoose from 'mongoose';

import Category from './post';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
      type: String,
      required: 'Digite o titulo da postagem'
    },
    titleUrl: {
      type: String,
      required: 'Digite o titulo da URL da postagem'
    },
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    comment: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    content: {
      type: String,
      required: 'Digite o conteudo da postagem'
    },
    imgUrl: {
      type: String
    },
    author: { type: Schema.Types.ObjectId, ref: 'User'}
    }, { timestamps: true });

PostSchema.statics = {

  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 20;
    return this.find(criteria)
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'author', select: 'profile' })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

module.exports = mongoose.model('Post', PostSchema);