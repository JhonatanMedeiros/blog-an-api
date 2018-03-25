'use strict';
import mongoose from 'mongoose';

import Category from '../models/post';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
      type: String,
      required: 'Digite o titulo da postagem'
    },
    titleUrl: {
      type: String,
      required: 'Digite o titulo da URL da postagem',
      unique: true
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
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('Post', PostSchema);