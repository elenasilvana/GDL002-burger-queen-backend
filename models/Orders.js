const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declarates schema

//y si voy a agregar un array como la orden? 
const OrderSchema = Schema({
    clientname: String,
    status: {
        type: String, 
        enum: ['pending', 'preparing', 'delivering', 'delivered']
    },
    //order debería llamarse items
    items: []
    //propiedad Date, que guarde la hora y fecha en que ha sido creada la orden
});

//export module

module.exports = mongoose.model('Order', OrderSchema);