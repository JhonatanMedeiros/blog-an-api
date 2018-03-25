'use strict';
import mongoose from 'mongoose';

import Post from './post';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
      type: String,
      required: 'Digite o nome da Categoria'
    },
    text: {
      type: String,
      required: 'Digite o nome da Categoria',
      lowercase: true
    },
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('Category', CategorySchema);