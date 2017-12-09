'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
        name: {
            type: String,
            required: 'Digite o nome da Categoria'
        },
        posts:[{ type: Schema.Types.ObjectId, ref: 'Post' }]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Category', CategorySchema);