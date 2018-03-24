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
      required: 'Digite o titulo da URL da postagem'
    },
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    content: {
      type: String,
      required: 'Digite o conteudo da postagem'
    },
    imgUrl: {
      type: String
    },
    author: {
      type: String,
      required: 'Digite o Author'
    },
    authorId: {
      type: String,
      required: 'Digite o Id do Author'
    },
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('Post', PostSchema);