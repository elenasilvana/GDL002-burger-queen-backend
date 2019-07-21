const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const MenuSchema = Schema({
    category: {
        type: String, 
        required: true /*, enum: ['desayuno', 'normal']*/
    },
    img: {
        type: String, 
        required: true 
    },//url de imagen
    price: {
        type: Number, 
        required: true 
    },
    product: { 
        type: String, 
        required: true 
    } //nombre de la comida
    //options: Array, extras: Array
});

//exports module
module.exports = mongoose.model('Menu', MenuSchema);