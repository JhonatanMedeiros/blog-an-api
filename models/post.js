'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
    title: {
        type: String,
        required: 'Digite o titulo da postagem'
    },
    content: {
        type: String,
        required: 'Digite o conteudo da postagem'
    },
    imgUrl: {
      type: String
    },
    author: {
        type: String
    },
    authorId: {
        type: Number
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);