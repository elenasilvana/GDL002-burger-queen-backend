const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declarates schema

//y si voy a agregar un array como la orden? 
const OrderSchema = Schema({
    clientname: String,
    status: {type: String, enum: ['pending', 'preparing', 'delivering', 'delivered']},
    order: Array
});

//export module

//const Order = mongoose.model('Order', OrderSchema);
//module.exports = Order;
module.exports = mongoose.model('Order', OrderSchema);