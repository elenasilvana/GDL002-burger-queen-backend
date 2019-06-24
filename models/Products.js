const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const MenuSchema = Schema({
    category: {type: String, enum: ['Desayuno', 'Normal']},
    img: String,//url de imagen
    price: {type:Number, default: 0},
    product: String, //nombre de la comida
    //options: Array, extras: Array
});

//exports module
module.exports = mongoose.model('Menu', MenuSchema);