'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
    name: {
        type: String,
        required: 'Digite o nome da Categoria'
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Category', CategorySchema);